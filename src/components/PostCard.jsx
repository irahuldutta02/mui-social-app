import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PostsContext from "../provider/PostsProvider";

export default function PostCard({
  id,
  image,
  likes,
  tags,
  text,
  publishDate,
  owner,
}) {
  const formattedPubDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const { postsData, setPostsData } = useContext(PostsContext);

  const [liked, setLiked] = useState(false);

  async function handleLike() {
    axios
      .put(
        `https://dummyapi.io/data/v1/post/${id}`,
        {
          likes: liked ? likes - 1 : likes + 1,
        },
        {
          headers: {
            "app-id": import.meta.env.VITE_APP_ID,
          },
        }
      )
      .then((response) => {
        setLiked(!liked);
        setPostsData(
          postsData.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                likes: response.data.likes,
              };
            }
            return post;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleDelete() {
    axios
      .delete(`https://dummyapi.io/data/v1/post/${id}`, {
        headers: {
          "app-id": import.meta.env.VITE_APP_ID,
        },
      })
      .then(() => {
        const updatedPosts = postsData.filter((post) => post.id !== id);
        setPostsData(updatedPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: 500,
      }}
    >
      <Link
        to={`/user/${owner.id}`}
        style={{
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <CardHeader
          avatar={<Avatar alt="Cindy Baker" src={owner.picture} />}
          title={owner.firstName}
          subheader={formattedPubDate}
        />
      </Link>
      <CardMedia component="img" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        paddingInline={2}
        gap={1}
      >
        {tags.length > 0 && tags.map((tag) => <Chip key={tag} label={tag} />)}
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {liked ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <span style={{ padding: "0 5px" }}>{likes}</span>
        </Box>

        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon aria-label="delete"></DeleteIcon>
        </IconButton>
      </Box>
    </Card>
  );
}
