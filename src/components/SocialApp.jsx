import Container from "@mui/material/Container";
import useAllPosts from "../hooks/useAllPosts";
import PostsContext from "../provider/PostsProvider";
import { Input } from "./Input/Input";
import MainContainer from "./MainContainer/MainContainer";

export function SocialApp() {
  const [postsData, setPostsData] = useAllPosts();

  return (
    <>
      <Container maxWidth="xl" style={{ paddingTop: "20px" }}>
        <PostsContext.Provider value={{ postsData, setPostsData }}>
          <Input />
          <MainContainer />
        </PostsContext.Provider>
      </Container>
    </>
  );
}
