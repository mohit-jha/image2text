import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";

const PrivateRoute = () => {
  const auth = sessionStorage.getItem("token") !== null; // Replace with your actual token key
  console.log(auth, "auth");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
