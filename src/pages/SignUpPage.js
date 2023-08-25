import React, { useState } from "react";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";

const SignUpPage = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
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
