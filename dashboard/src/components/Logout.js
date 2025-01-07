import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogOut = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        window.location.href = "http://localhost:3000/";
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:3002",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setUsername(user);

          // Check if the toast has been shown before in this session
          if (!localStorage.getItem("toastShown")) {
            toast(`Welcome ${user}!`, {
              position: "top-right",
            });
            // Set the flag in localStorage
            localStorage.setItem("toastShown", "true");
          }
        } else {
          removeCookie("token");
          window.location.href = "http://localhost:3000/";
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        removeCookie("token");
        window.location.href = "http://localhost:3000/";
      }
    };

    verifyCookie();
  }, [cookies.token, removeCookie]);

  const logOut = () => {
    removeCookie("token");
    localStorage.removeItem("toastShown"); // Reset the toast flag on logout
    window.location.href = "http://localhost:3000/";
  };

  return (
    <>
      <div className="home_page">
        <button
          onClick={logOut}
          style={{
            marginLeft: "18px",
            borderRadius: "5px",
            padding: "7px",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default LogOut;