import React, { useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
// var axios = require('axios');

const dotenv = require('dotenv').config();

const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

console.log('process.env.React...: ' + process.env.REACT_APP_AUTH_CLIENT_ID);
// const clientId = "736729752425-puvqvdfvlhiuptbfdeiej8bo93brjjmj.apps.googleusercontent.com";
// console.log("clientId: " + clientId);


function Login(){
  const onSuccess = (res) => {
    localStorage.clear();
    var isLoggedIn = false;
    if (res.profileObj.email === "jirani@towson.edu" || res.profileObj.email.split("@")[1] === "students.towson.edu"){
      // console.log(`name: ${res.profileObj.name}, email: ${res.profileObj.email}, token: ${res.tokenId}`);
      console.log(`name: ${res.profileObj.name}, email: ${res.profileObj.email}`);
      refreshTokenSetup(res);
      isLoggedIn = true;
      localStorage.setItem('email', res.profileObj.email);
      localStorage.setItem('name', res.profileObj.name);
      localStorage.setItem('token', res.tokenId);
    }
    console.log("After login. current LoggedIn status: " + isLoggedIn);
    return isLoggedIn;
  };

  const onFailure = (res) => {
    console.log('Google auth failed: ', res);
    return false;
  };

 const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // cookiePolicy='single_host_origin',
  });
  
 return (
    <button onClick={signIn}>
      <p>Sign in with Google</p>
    </button>
  );
}
export default Login;