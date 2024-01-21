import { useEffect, useState } from "react";
import axios from "axios";

export default function useAllPosts() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyapi.io/data/v1/post", {
        headers: {
          "app-id": import.meta.env.VITE_APP_ID,
        },
      })
      .then((response) => {
        setPostsData(response.data.data);
      })
      .catch((error) => console.log(error));
  });

  return [postsData, setPostsData];
}
