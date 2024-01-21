import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box
          style={{
            width: "100%",
            maxWidth: "1536px",
            margin: "0 auto",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to={`/`}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <Typography variant="h6" fontSize={30} noWrap component="div">
                Social App
              </Typography>
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
