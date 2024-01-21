import Box from "@mui/material/Box";
import { PostCardList } from "../PostCardList/PostCardList";
import UserList from "../UserList/UserList";
export default function MainContainer() {
  return (
    <Box
      sx={{
        width: "100%",
        mt: "2rem",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        flexWrap: "wrap",
        flexDirection: { xs: "column", md: "row" },
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          flex: "1",
          justifyContent: "center",
          display: { xs: "none", md: "flex" },
        }}
      >
        <UserList />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: "2",
          gap: "1rem",
        }}
      >
        <PostCardList />
      </Box>
    </Box>
  );
}
