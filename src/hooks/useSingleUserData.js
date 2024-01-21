import axios from "axios";
import { useEffect, useState } from "react";

export default function useSingleUserData(userId) {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/v1/user/${userId}`, {
        headers: {
          "app-id": import.meta.env.VITE_APP_ID,
        },
      })
      .then((response) => {
        setUser(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  });

  return [user, status];
}
