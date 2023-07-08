import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useNavigate } from "react-router-dom";
import LoginService from "../../../services/login"
import { log } from 'console';


const GoogleSignInButton: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginGoogleUser } = bindActionCreators(actionCreators, dispatch);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const googleClientId = process.env.REACT_APP_O_AUTH_CLIENT_ID || "";

    const callback = async (response: any) => {
      try {
        const credentials = response.credential;
        await loginGoogleUser(credentials);
        navigate("/");
      } catch (error) {
        console.log(error);
        M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
      }


      // console.log(response);
      // const id_token = response.credential;
      // const login_response = await LoginService.googleLogin(id_token);
      // // handle successful sign-in response here
      // console.log(login_response);


    };



    // const handleLogin = async (event: React.SyntheticEvent) => {
    //   event.preventDefault();
    //   const login_info: LoginInfo = { username: email, password: password };
    //   // eslint-disable-next-line no-debugger
    //   try {
    //     await loginUser(login_info);
    //     navigate("/");
    //   } catch (error) {
    //     console.log(error);
    //     // M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
    //   }
    // };

    const runGoogleLogin = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: callback,
          auto_select: false
        });

        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rect',
            color: 'black',
            on_click: () => window.google.accounts.id.prompt()
          }
        );
      }
    };

    if (!window.google) {
      window.addEventListener('load', runGoogleLogin);
      return () => window.removeEventListener('load', runGoogleLogin);
    } else {
      runGoogleLogin();
    }
  }, []);

  return (
    <button type="button" >
      <div ref={buttonRef}  />
    </button>
  );
}

export default GoogleSignInButton;
