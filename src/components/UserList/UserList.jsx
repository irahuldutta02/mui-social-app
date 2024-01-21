import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import useUsersData from "../../hooks/useUsersData";

export default function UserList() {
  const [usersData, loading] = useUsersData();

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
          {!loading ? (
            usersData.map((user) => {
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
        </List>
      </Box>
    </>
  );
}
