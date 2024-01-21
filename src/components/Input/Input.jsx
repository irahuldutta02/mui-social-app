import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useContext, useState } from "react";
import validator from "validator";
import useUsersData from "../../hooks/useUsersData";
import PostsContext from "../../provider/PostsProvider";

function createUserArray(userData) {
  const userArray = [];
  userData.map((user) => {
    userArray.push({
      label: user.firstName + " " + user.lastName,
      id: user.id,
    });
  });
  return userArray;
}

function createTagArray(tags) {
  const tagArray = tags.split(",");
  const filteredTagArray = tagArray.filter((tag) => {
    if (tag.trim() !== "") {
      return tag.trim();
    }
  });
  return filteredTagArray;
}

export function Input() {
  const [postText, setPostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postAs, setPostAs] = useState(null);
  const { postsData, setPostsData } = useContext(PostsContext);

  const [usersData, loading] = useUsersData();

  async function createPost() {
    if (postText === "" || imageUrl === "" || postAs === null) {
      alert("Please fill in all fields");
      return;
    }

    if (!validator.isURL(imageUrl)) {
      alert("Please enter a valid url");
      return;
    }

    setPostLoading(true);

    axios
      .post(
        "https://dummyapi.io/data/v1/post/create",
        {
          owner: postAs.id,
          text: postText,
          image: imageUrl,
          likes: 0,
          tags: createTagArray(tags),
          publishDate: new Date(),
        },
        {
          headers: {
            "app-id": import.meta.env.VITE_APP_ID,
          },
        }
      )
      .then((response) => {
        setPostsData([response.data, ...postsData]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPostLoading(false);
        setPostText("");
        setImageUrl("");
      });
  }

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading...</h2>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Your next post"
            id="postText"
            value={postText}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Image url for your post"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Tags"
            id="tags"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />

          <Autocomplete
            disablePortal
            id="postAs"
            options={createUserArray(usersData)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Post As" />}
            value={postAs}
            onChange={(e, value) => {
              setPostAs(value);
            }}
          />

          {postLoading ? (
            <LoadingButton loading variant="outlined">
              Post
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                createPost();
              }}
            >
              Post
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
