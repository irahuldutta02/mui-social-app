import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import fetchAllUsers from "../../helpers/fetchAllUsers";

export default function UserList() {
  const response = useQuery("users", fetchAllUsers);

  if (response.isError) {
    return <div>Error</div>;
  }
  if (response.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (response.isSuccess) {
    const usersData = response.data.data.data;

    return (
      <>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>All Users</h2>
          </Box>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {usersData.map((user) => {
              return (
                <ListItem key={user.id} disablePadding>
                  <Link
                    to={`/user/${user.id}`}
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={user.title + user.firstName + user.lastName}
                          src={user.picture}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={user.id}
                        primary={
                          user.title +
                          " " +
                          user.firstName +
                          " " +
                          user.lastName
                        }
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </>
    );
  }
}
