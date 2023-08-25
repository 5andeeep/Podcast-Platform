import React, { useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode);
        console.log("errorMessage", errorMessage);
      });
      setTrigger(false);
  };

  return trigger ? (
    <div className="forgot-password-popup">
      <div className="popup-inner">
        <h2>Forgot Password</h2>
        <input
          type="text"
          className="email-input"
          placeholder="Enter your email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="close-btn" onClick={handleSubmit} onKeyUp={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ForgotPassword;
