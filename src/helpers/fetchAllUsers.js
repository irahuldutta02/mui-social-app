import axios from "axios";

const fetchAllUsers = async () => {
  const response = await axios.get("https://dummyapi.io/data/v1/user", {
    headers: {
      "app-id": import.meta.env.VITE_APP_ID,
    },
  });
  return response;
};

export default fetchAllUsers;
