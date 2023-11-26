import React from "react";
import { useDispatch } from "react-redux";
import sncLogo from "../../assets/AtkinsRealisLogog.svg";
import dpwIcon from "../../assets/dpw-icon.svg";
import loginBG from "../../assets/login-bg.jpg";
import Loader from '../../components/Loader';
import {
  setUserEmail,
  setUserLoginSource,
  setUserName
} from "../../redux/slices/userDetailsSlice";

const LandingPage = () => {
  const dispatch = useDispatch();  
  const authRequest = {
    scopes: ["User.Read"],
    prompt: 'select_account',
  };

  return (
    <div className="fl w100 login-wrapper">
      <header className="sr-only">Login Header</header>
      <img src={loginBG} alt='loginBG' className="fl" />
      <div className="fl login-content">
        <h1 className="fl w100 login-title">
          <span className="fl">Welcome</span>
          <span className="fl">back!</span>
        </h1>
        <div className="fl w100">
          <p className="fl w100 btn-title">Login with</p>          
        </div>
      </div>
    </div >
  );
};

export default LandingPage;
