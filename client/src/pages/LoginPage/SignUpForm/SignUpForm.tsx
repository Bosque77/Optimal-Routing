import React, { useState } from "react";
import front_page_logo from "../../../static/images/front_page_logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserService from "services/users";
import GoogleSignInButton from "../SignInForm/GoogleSignInButton";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { HttpResponse } from "../../../../../shared/types";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showAlert, } = bindActionCreators(
    actionCreators,
    dispatch
  );


  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verify_password, setVerifyPassword] = useState<string>("");
  const [msg, setMsg] = useState<string | undefined>(undefined);

  const onSetPassword = (password: string) => {
    setPassword(password);
    setMsg(undefined);
  };

  const onSetVerifyPassword = (verify_password: string) => {
    setVerifyPassword(verify_password);
    setMsg(undefined);
  };

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const passwords_match = password === verify_password;
    if (!passwords_match) {
      setMsg("Passwords do not match");
      return;
    }
  
    const signUpInfo = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      password: password,
    };
  
    const response = await UserService.signUpUser(signUpInfo) as unknown as HttpResponse;
    if (response.status === "ERROR") {
      showAlert("Error creating user sign in", "error"); // Change "success" to "error"
    } else {
      showAlert(
        "Your account as been created. Verify your email address before you can begin.",
        "success"
      );
      navigate("/login");
    }
  };
  

  return (
    <>
      <div className="bg-white items-center px-12  py-6 rounded shadow">
        <h1 className="flex text-3xl font-bold my-6">
          Route Optimization Services
        </h1>
        <img src={front_page_logo} className="w-32 mx-auto my-2" />
        <p className="m-0 text-2xl leading-10 font-normal text-green-800">
          {" "}
          Create Your Account
        </p>
        <p className="font-euclid mb-8 text-lg font-bold text-gray-800 ">
          Have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600">
            Log in now
          </button>
        </p>
        <form>
          <div className="grid gap-x-6 gap-y-2 grid-cols-1">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 text-left pl-2">
                First Name
              </label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="street"
                id="street"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Last Name"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 text-left pl-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="yourEmail@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 text-left pl-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 text-left pl-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => onSetPassword(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 text-left pl-2">
                Re-Enter Password
              </label>
              <input
                type="password"
                value={verify_password}
                onChange={(e) => onSetVerifyPassword(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Re-Enter Password"
              />
            </div>
          </div>
          <div className="flex flex-row justify-start w-full mt-4">{msg}</div>
          <div className="flex flex-row my-auto justify-center mt-8">
            <button
              className=" w-48 py-2 px-4 bg-primary text-white rounded hover:bg-slate-900 active:scale-95"
              onClick={signUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500">or sign up with Google</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>

        <GoogleSignInButton />
      </div>
    </>
  );
};

export default SignUpForm;
