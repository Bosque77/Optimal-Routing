/* eslint-disable indent */
import React, { useState } from "react";
import "./SignInForm.css";
import front_page_logo from "../../static/images/front_page_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { LoginInfo } from "../../types";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { loginUser } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const login_info: LoginInfo = { username: email, password: password };
    // eslint-disable-next-line no-debugger
    try {
      await loginUser(login_info);
      navigate("/");
    } catch (error) {
      console.log(error);
      // M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
    }
  };

  return (
    <>
    <main className="bg-white items-center">
      <div className="">
      Hey there
      </div>

    {/* <div className="f text-3xl font-bold mb-5">Route Optimization Services</div>
      <h1 className="flex text-3xl font-bold mb-5">Route Optimization Services</h1>

      <div className="text-center mb-10">
        <img src={front_page_logo} className="w-32" />
      </div>

      <h5 className="text-gray-600 text-base mb-10">
        Please, login into your account
      </h5>

      <div className="bg-white p-10 rounded-lg shadow-md">
        <form
          className="w-full"
          method="post"
          onSubmit={(event) => handleLogin(event)}
        >
          <div className="mb-5">
            <input
              className="w-full border border-gray-400 p-2"
              type="text"
              name="user-name"
              id="user-name"
              onChange={({ target }) => setEmail(target.value)}
            />
            <label className="block mt-2 text-gray-600" htmlFor="email">
              Enter your email
            </label>
          </div>

          <div className="mb-5">
            <input
              className="w-full border border-gray-400 p-2"
              type="password"
              name="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <label className="block mt-2 text-gray-600" htmlFor="password">
              Enter your password
            </label>
          </div>

          <div className="mb-5">
            <button
              type="submit"
              name="btn_login"
              className="bg-indigo-500 text-white p-2 rounded-full"
            >
              Login
            </button>
            <a className="ml-3 text-pink-500 underline" href="#!">
              Forgot Password?
            </a>
          </div>

          <div className="text-center">
            <a className="text-black" href="#!">
              Create account
            </a>
          </div>
        </form>
      </div> */}
    </main>
    </>
  );
};

export default SignInForm;
