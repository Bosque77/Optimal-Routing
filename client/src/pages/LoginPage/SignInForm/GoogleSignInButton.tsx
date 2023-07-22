import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useNavigate } from "react-router-dom";
import LoginService from "../../../services/login"
import { log } from 'console';
import { HttpResponse } from '../../../../../shared/types';


const GoogleSignInButton: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginGoogleUser, showAlert } = bindActionCreators(actionCreators, dispatch);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const googleClientId = process.env.REACT_APP_O_AUTH_CLIENT_ID || "";

    const callback = async (google_response: any) => {
        console.log('inside the callback function')
        const credentials = google_response.credential;
        const response = await loginGoogleUser(credentials) as any as HttpResponse;
        console.log('logging the response from the google login')
        console.log(response)
        if(response.status === "OK"){
          navigate("/");
        }else{
          showAlert(
            "Your email/password is either incorrect or has not been verified.",
            "error"
          );
        }
    };



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
