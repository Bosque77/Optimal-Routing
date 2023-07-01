import React from "react";
import google_icon from "../../assets/google.svg";
import { GoogleLogin } from "react-google-login";

// Types for GoogleLoginResponse
interface GoogleLoginResponse {
  profileObj: {
    email: string;
    familyName: string;
    givenName: string;
    googleId: string;
    imageUrl: string;
    name: string;
  };
  tokenId: string;
}

// Types for GoogleLoginResponseOffline
interface GoogleLoginResponseOffline {
  code: string;
}

const GoogleSignInButton: React.FC = () => {


  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log('inside response google')
    console.log(response)
    if ("profileObj" in response) {
      console.log('handling the online login response')
      console.log(response.profileObj); // Handle online login response
    } else {
      console.log('handling the offline login response')
      console.log(response.code); // Handle offline login response
    }
  };

  const clientId = process.env.REACT_APP_O_AUTH_CLIENT_ID || "";

  return (
    <div className="flex items-center justify-center">
      <GoogleLogin
        clientId={clientId}
        onSuccess={responseGoogle}
        onFailure={(error) => console.log(error)}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            type="submit"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className=" w-64 mt-4 py-2 px-4 bg-white text-black rounded hover:bg-slate-900 hover:text-white active:scale-95 border"
          >
            <img src={google_icon} className="w-4 inline-block mr-2" />
            Sign In With Google
          </button>
        )}
      />
    </div>
  );
};

export default GoogleSignInButton;
