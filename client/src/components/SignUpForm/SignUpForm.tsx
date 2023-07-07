import React, { useState } from "react";
import "./SignUpForm.css";
import front_page_logo from "../../static/images/front_page_logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/users";

interface prop {
  setSignUpModalActive: (active: boolean) => void;
}

const SignUpForm = ({ setSignUpModalActive }: prop) => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verify_password, setVerifyPassword] = useState<string>("");
  const [msg, setMsg] = useState<string | undefined>("Hello there bobby boi");



  const onSetPassword = (password: string) => {
    setPassword(password);
    setMsg(undefined);
  }

  const onSetVerifyPassword = (verify_password: string) => {
    setVerifyPassword(verify_password);
    setMsg(undefined);
  }

  const signUp = async (event: React.SyntheticEvent) => {

    const passwords_match = password === verify_password;
    if (!passwords_match) {
      setMsg("Passwords do not match");
      return;
    }

    event.preventDefault();
    const signUpInfo = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      password: password,
    };
    // eslint-disable-next-line no-debugger
    try {
      // const response = await UserService.signUpUser(signUpInfo);
      navigate("/");
    } catch (error) {
      console.log(error);
      // M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center z-10 fixed top-0 left-0">
        <div className="bg-white px-12 pt-4 pb-6 rounded-lg shadow-xl absolute z-50 flex flex-col relative overflow-hidden">
          <div className="flex flex-row justify-center ">
            <img src={front_page_logo} className="w-32 mx-auto my-8" />
          </div>
          <div className="grid gap-x-6 gap-y-6 grid-cols-2">
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
          <div className="flex flex-row justify-start w-full mt-4">
            {msg}
          </div>
          <div className="flex flex-row my-auto justify-end mt-8">
            <button
              className=" text-gray-400 text-sm hover:text-black active:scale-95 mr-6"
              onClick={() => setSignUpModalActive(false)}
            >
              Cancel
            </button>
            <button
              className=" w-48 py-2 px-4 bg-primary text-white rounded hover:bg-slate-900 active:scale-95"
              onClick={signUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </>
  );
};

export default SignUpForm;
