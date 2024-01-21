import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PostCard from "../PostCard";
import { useContext } from "react";
import PostsContext from "../../provider/PostsProvider";

export function PostCardList() {
  const { postsData } = useContext(PostsContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Recent Posts</h2>
      </Box>

      {postsData.length > 0 ? (
        postsData.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image}
              text={post.text}
              likes={post.likes}
              owner={post.owner}
              tags={post.tags}
              publishDate={post.publishDate}
            />
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
