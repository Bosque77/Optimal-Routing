import React from "react";
import "./Login.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import background_image from "./images/login_background.png";

import { Route, Routes } from "react-router-dom";

const Login = () => {
  return (
    <div className="body bg-slate-50 h-screen">
      <div className="flex items-center h-full">
        <img src={background_image} className="w-3/5" />

        <div className="">
          <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="SignIn" element={<SignInForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Login;
