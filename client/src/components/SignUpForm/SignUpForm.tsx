import React, { useState } from "react";
import "./SignUpForm.css";
import front_page_logo from "../../static/images/front_page_logo.png";
import { Link } from "react-router-dom";

interface prop {
  setSignUpModalActive: (active: boolean) => void;
}

const SignUpForm = ({setSignUpModalActive}:prop) => {

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const signUpInfo = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
    };
    // eslint-disable-next-line no-debugger
    try {
      // await signUpUser(signUpInfo);
      // navigate("/");
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
          <div className="grid gap-4 grid-cols-1">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
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
              <label
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="yourEmail@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Phone Number"
              />
            </div>
            <button className=" w-64 mt-6 py-2 px-4 bg-primary text-white rounded hover:bg-slate-900 active:scale-95">Sign Up</button>
            <button className=" text-gray-400 text-sm hover:text-black active:scale-95" onClick={() => setSignUpModalActive(false)}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </>
  );
};

export default SignUpForm;
