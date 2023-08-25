import React from 'react'
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from 'react-redux';
import { auth } from "../../../firebase";
import { signOut } from 'firebase/auth';
import { clearUser } from "../../../slices/userSlice";
import { toast } from 'react-toastify';


const Header = () => {

  const location = useLocation();
  const currLocation = location.pathname;
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try{
      await signOut(auth);
      dispatch(clearUser());
    }
    catch(e){
      toast.error(e.message);
      console.log("error while logout ", e);
    }
  }

  return (
    <div className='navbar'>
      <div className="gradient-shadow-box"></div>
      <div className="links">
        <Link to="/" className={currLocation === '/' ? 'active' : ""}>Signup</Link>
        <Link to="/podcasts" className={currLocation === '/podcasts' ? 'active' : ""}>Podcasts</Link>
        <Link to="/create-a-podcast" className={currLocation === '/create-a-podcast' ? 'active' : ""}>Create Podcast</Link>
        <Link to="/profile" className={currLocation === '/profile' ? 'active' : ""}>Profile</Link>
        {
          user &&
          (<Link to="#" onClick={handleLogout}>Logout</Link>)
        }
      </div>
    </div>
  )
}

export default Header