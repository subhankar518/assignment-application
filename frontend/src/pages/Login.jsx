import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils.js";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userName, password } = loginInfo;
    if (!userName || !password) {
      return handleError("username and password are required");
    }
    try {
      const url = `http://localhost:8000/api/v1/users/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, JWT_Token, user, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", JWT_Token);
        localStorage.setItem("loggedInUser", user?.name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            onChange={handleChange}
            type="text"
            name="userName"
            placeholder="Username..."
            value={loginInfo.userName}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does't have an account ?<Link to="/signup">Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
