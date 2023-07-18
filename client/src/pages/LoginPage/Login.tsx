import React from "react";
import "./Login.css";
import SignUpForm from "./SignUpForm/SignUpForm";
import SignInForm from "./SignInForm/SignInForm";
import background_image from "./images/login_background.png";
import Alert from "components/Alert";

import { Route, Routes } from "react-router-dom";

const Login = () => {
  return (
    <div className="body bg-slate-50 h-screen">
      <Alert />
      <div className="flex items-center h-full">
        <img src={background_image} className="w-3/5" />
        <div className="mx-auto">
          <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="SignUp" element={<SignUpForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Login;
