import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios';
import {url} from '../../setUrl'

const Login = (prop) => {

    const successLogin = (res) =>{
        const {profileObj, tokenId} = res;
        axios.post(url + '/login', {
            method: 'POST',
            data: profileObj,
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorize': tokenId},
            credentials: 'include',
            mode: 'cors'
        })
        .then((srvRes)=>{
            console.log(srvRes);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const failedLogin = (res) =>{
        console.log(res.error);
    }

    

    return ( 
        <div>
            <GoogleLogin
            clientId="140075970753-g87nv52olq7lucv6mt9fbflgr173ql0s.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={successLogin}
            onFailure={failedLogin}
            cookiePolicy={'single_host_origin'}
            />
        </div>
     );
}
 
export default Login;