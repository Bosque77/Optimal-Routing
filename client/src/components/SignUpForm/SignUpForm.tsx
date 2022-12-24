import React from "react";
import "./SignUpForm.css";
import logo from "./images/logo.svg";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <div className="sign-up-wrap">
      <img src={logo} alt="" />
      <div className="w-form">
        <div className="placeholder-text-style-embed-code w-embed"></div>
        <form
          id="email-form"
          name="email-form"
          data-name="Email Form"
          className="form"
          autoComplete="off"
        >
          <input
            type="text"
            className="text_field"
            maxLength={256}
            name="name"
            data-name="Name"
            placeholder="Your name"
            id="name"
          />
          <input
            type="email"
            className="text_field"
            maxLength={256}
            name="email"
            data-name="Email"
            placeholder="Email Address"
            id="email"
            autoCapitalize="off"
          />
          <input
            type="password"
            className="text_field"
            maxLength={256}
            name="Password"
            data-name="Password"
            placeholder="Password"
            id="Password"
          />
          <input
            type="submit"
            value="Sign Up"
            data-wait="Please wait..."
            className="btn grey darken-1"
          />
        </form>
        <div className="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
      <div className="sign-up">
        <p className="paragraph">
          Already have an account?{" "}
          <Link to="/SignIn" className="link">
            Log in
          </Link>
          .<br />
        </p>
        <input className="input-field" />
      </div>
    </div>
  );
};

export default SignUpForm;
