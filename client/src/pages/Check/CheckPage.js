import React from 'react';
import Logo from './img/A&S_LOGO.png'
import './style.css'



export default () => {
  return (
    <div>
      <img alt="" id="logo" src={Logo}/>
      <div id="check">Please check your email to activate your account link.</div>
      <div id="dontsee">Don't see an email?</div>
      <button id="resendButton">Resend Link</button>
    </div>
  );
}
