import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import CustomRoutes from "./routes/Routes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <CustomRoutes />
    </>
  );
}

export default App;
