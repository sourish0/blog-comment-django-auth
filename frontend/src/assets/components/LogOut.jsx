import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(
          "http://localhost:8000/logout/",
          { refresh_token: localStorage.getItem("refresh_token") },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    };

    logoutUser();
  }, []);

  return null; // No need for an empty div
};
