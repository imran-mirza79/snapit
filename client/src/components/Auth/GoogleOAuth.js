import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';

const GoogleOAuth = ({isSignUp}) => {

   const GOOGLE_ID =
		"47825146777-1fhffm5g8nsb19u3tnnnm6sm4dpi9uep.apps.googleusercontent.com";
    return (
        <GoogleOAuthProvider clientId={GOOGLE_ID}>
            <GoogleLogin isSignUp={ isSignUp} />
        </GoogleOAuthProvider>
	);
};

export default GoogleOAuth