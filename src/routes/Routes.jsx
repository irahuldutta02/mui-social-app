import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage.jsx";
import { SocialApp } from "../components/SocialApp";
import { UserCard } from "../components/UserCard/UserCard";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SocialApp />} />
      <Route path="/user/:id" element={<UserCard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default CustomRoutes;
