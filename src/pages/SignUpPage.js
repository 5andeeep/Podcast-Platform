import React, { useState } from "react";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";
import Header from "../components/CommonComponents/Header/Header";

const SignUpPage = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div>
      <Header flag={flag}/>
      <div className="input-wrapper">
        {flag ? <h1>Login</h1> : <h1>Signup</h1>}
        {flag ? <LoginForm /> : <SignupForm />}
        {!flag ? (
          <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
            Already have an Account? <span className="msg">Click here to Login.</span>
          </p>
        ) : (
          <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
            Want a new Account? <span className="msg">Click here to Signup.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
