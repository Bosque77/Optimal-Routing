import React, { useEffect, useRef } from 'react';
import LoginService from "../../services/login"


const GoogleSignInButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const googleClientId = process.env.REACT_APP_O_AUTH_CLIENT_ID || "";

    const callback = async (response: any) => {
      console.log(response);
      const id_token = response.credential;
      const resposne = await LoginService.googleLogin(id_token);
      // handle successful sign-in response here
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
