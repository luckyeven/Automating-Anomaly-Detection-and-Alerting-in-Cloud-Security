import { func } from 'prop-types';
import React from 'react'

import {GoogleLogout} from 'react-google-login'

const clientId = '395775578059-e2nqch33deupck78j3t3s9atgs9lefgc.apps.googleusercontent.com';

function Logout() {
    const onLogoutSuccess = () => {
        console.log('Logged out Success');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
            />
        </div>
    )
}

export default Logout