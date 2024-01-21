import { useEffect, useState } from "react";
import axios from "axios";

export default function useUsersData() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyapi.io/data/v1/user", {
        headers: {
          "app-id": import.meta.env.VITE_APP_ID,
        },
      })
      .then((response) => {
        setUsersData(response.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  });

  return [usersData, loading];
}
