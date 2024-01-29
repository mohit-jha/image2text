import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this import
import "./login.css";
import loginImage from "../../assets/images/login.jpg";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import endpoints from "../../api/endpoints";
const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [policyStatus, setPolicyStatus] = useState(null);

  useEffect(() => {
    setPolicyStatus(JSON.parse(sessionStorage.getItem("policy_status")));
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setLoginError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginError("");
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    let userData = { username, password };
    let url = apiConfig.baseURL + endpoints.login;
    try {
      const response = await axios.post(
        url,
        userData
      ); // Replace with your API endpoint
      console.log("Response:", response.data);
      sessionStorage.setItem("token", response.data.token);
      if (response.data.token) {
        return navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_wrapper">
      <div className="loginContainer">
        <div className="left">
          <form className="form">
            <div className="email_field">
              <label>
                Username<span style={{ color: "#E72D13" }}>*</span>
              </label>
              <input
                type="text"
                data-testid="company-email-input"
                className="input"
                value={username}
                onChange={handleUsernameChange}
                onKeyDown={handleEnterKeyPress}
              />
            </div>
            <div className="password_field">
              <label>
                Password<span style={{ color: "#E72D13" }}>*</span>
              </label>
              <input
                type="password"
                data-testid="password-input"
                className="input"
                onChange={handlePasswordChange}
                onKeyDown={handleEnterKeyPress}
              />
            </div>
          </form>

          <div className="error_msg">
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </div>

          <div className="login_button">
            <button onClick={handleLogin} disabled={loading}>
              {loading ? <div className="loading">Loading...</div> : "Sign In"}
            </button>
          </div>
        </div>

        <div className="right">
          <div className="login_image">
            <img src={loginImage} alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
