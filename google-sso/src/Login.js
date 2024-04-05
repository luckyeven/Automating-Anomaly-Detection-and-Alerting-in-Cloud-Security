import React from 'react';
import { GoogleLogin } from 'react-google-login';


const clientId = '395775578059-e2nqch33deupck78j3t3s9atgs9lefgc.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };
    
    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    };
    
    return (
        <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        </div>
    );
    }

    export default Login;