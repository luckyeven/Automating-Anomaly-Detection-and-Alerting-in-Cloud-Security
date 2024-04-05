import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



const dataCollectionEndpointUri = `https://google-sso-dce-4jm4.westus3-1.ingest.monitor.azure.com`;
const dcrImmutableId = "<ImmutableId>";
const customLogName = "Custom-googlessologs_CL";
const apiVersion = "2023-01-01";
const authorizationToken = "<authorizationToken>"

const sendLogToAzure = (message) => {


    const logMessage = {
        ...message,
        TimeGenerated: new Date().toISOString() 
    };
    const requestBody = JSON.stringify(logMessage);

    //const tokenAudience = "https://monitor.azure.com";
    
    const uri = `${dataCollectionEndpointUri}/dataCollectionRules/${dcrImmutableId}/streams/${customLogName}?api-version=${apiVersion}`;
    console.log('URI:', uri);
    console.log('Request Body:', requestBody);
    axios.post(uri, requestBody, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authorizationToken}`, 
            //"x-ms-date": dateString,
            //"x-ms-client-request-id": "{GUID_HERE}", 
            // "Content-Encoding": "gzip", 
        }
    })
    .then(response => {
        console.log(`Data successfully sent to Azure. Status: ${response.status}`);
        console.log('Response:', response.data);
    }).catch((err) => console.error('Logging to Azure failed:', err));
};

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
           
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((response) => {
              
                setUser(codeResponse);
                sendLogToAzure({
                    event: 'login_success',
                    userId: response.data.email, 
                    loginAttemptResult: "Success",
                    loginMethod: "GoogleSSO"
                });
            })
            .catch((err) => {
                console.error(err);
                sendLogToAzure({
                    event: 'profile_fetch_failed',
                    error: JSON.stringify(err),
                    userId: codeResponse.email, 
                    loginAttemptResult: "Failed",
                    loginMethod: "GoogleSSO"
                });
            });
        },
        onError: (error) => {
            console.error('Login Failed:', error);
            sendLogToAzure({
                event: 'login_failed',
                error: JSON.stringify(error),
                loginAttemptResult: "Failed",
                loginMethod: "GoogleSSO"
            });
        }
    });
    
    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                sendLogToAzure({
                    event: 'profile_fetch_success',
                    userId: res.data.email,
                    loginAttemptResult: "Success",
                    loginMethod: "GoogleSSO"
                });
            })
            .catch((err) => {
                console.error(err);
                sendLogToAzure({
                    event: 'profile_fetch_failed',
                    error: JSON.stringify(err),
                    userId: user.profileObj.email,
                    loginAttemptResult: "Failed",
                    loginMethod: "GoogleSSO"
                });
            });
        }
    }, [user]);

    const logOut = () => {
        if (profile) {
            sendLogToAzure({
                event: 'logout',
                userId: profile.email,
                loginAttemptResult: "N/A",
                loginMethod: "GoogleSSO"
            });
        }
        googleLogout();
        setUser(null);
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="Profile" />
                    <h3>User Logged In</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <button onClick={logOut}>Log Out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google</button>
            )}
        </div>
    );
}

export default App;