import "./style.css";
import React, {useState} from 'react'
import InputComponent from '../../CommonComponents/CustomInputs/InputComponent';
import ButtonComponent from '../../CommonComponents/CustomButtons/ButtonComponent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { db, auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ForgotPassword from "../../ForgotPassword";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
    // console.log("Handle Login..")
    setLoading(true);
    if(email && password){
      try{
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        // console.log("userData", userData);
  
        dispatch(setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
          profileImage: userData.profileImage
        }));
  
        // redirect to profile page..
        toast.success("Login Successfull");
        navigate("/profile");
        setLoading(false)
      }
      catch(e){
        console.log('error', e);
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
      toast.error("Make sure fields are not empty.");
      setLoading(false);
    }
  }

  return (
    <div style={{width: "100%"}}>
      <div className="common">
        <InputComponent
          state={email}
          setState={setEmail}
          placeholder="Email"
          type="email"
          required={true}
        />
        <InputComponent
          state={password}
          setState={setPassword}
          placeholder="Password"
          type="password"
          required={true}
        />
        <ButtonComponent text={loading? "Loading..." :"Login"} disabled={loading} onClick={handleLogin} />
        <p className="forgot-password-btn" onClick={() => setPopup(true)}>Forgot Password</p>
      </div>
        <ForgotPassword trigger={popup} setTrigger={setPopup}/>
    </div>
  )
}

export default LoginForm;