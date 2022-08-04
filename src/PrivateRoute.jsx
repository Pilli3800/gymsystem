import React from "react";
import Login from "./pages/login/Login";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import UserRoutes from "./UserRoutes"

const userUID = localStorage.getItem("user");


const useAuth = () => {
  if (userUID !== null) return true;
  return false;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  let navigate = useNavigate();
  return isAuth ? <Outlet/> : <Login/>};

export default PrivateRoutes;
