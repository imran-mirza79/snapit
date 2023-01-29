import React, {useContext} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import GoogleIcon from '../../images/GoogleIcon';
import UserContext from '../../context/UserContext';
import { getUserData } from '../../actions/user'
import { useNavigate } from 'react-router-dom';
import { googleSignin, googleSignup } from "../../actions/auth";

import './styles.css';

const GoogleLogin = ({ isSignUp }) => {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    
    const onSuccessLogin = async (res) => {
        const token = res?.access_token;
        // const token_type = res?.token_type;
        const data = await getUserData(token);
        try {
            if (isSignUp) {
                let response = await googleSignup(data, navigate);
				setUser({ data: response?.result, token: response?.token });
				localStorage.setItem(
					"user",
					JSON.stringify({ data: response?.result, token: response?.token })
				);
            } else {
                let response = await googleSignin(data, navigate);
				setUser({ data: response?.result, token: response?.token });
				localStorage.setItem(
					"user",
					JSON.stringify({
						data: response?.result,
						token: response?.token,
					})
				);
            }
          
        } catch (error) {
            console.log(error)
        }
    }

    const onFailedLogin = (error) => {
        console.log(error);
    }
    
    
    const handleLogin = useGoogleLogin({
		onSuccess: (res) => onSuccessLogin(res),
		onError: (res) => onFailedLogin(res),
		scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
	});

    return (
        <Button onClick={() => handleLogin()} className='googleButton' variant='contained'>
            <GoogleIcon/>
        {isSignUp ? 'Sign Up with Google' : 'Sign In With Google'}
    </Button>
    );
};

export default GoogleLogin;