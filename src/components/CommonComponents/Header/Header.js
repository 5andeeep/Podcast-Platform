import React from 'react'
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../../../firebase";
import { signOut } from 'firebase/auth';
import { clearUser } from "../../../slices/userSlice";
import { toast } from 'react-toastify';


const Header = ({flag}) => {

  const location = useLocation();
  const currLocation = location.pathname;
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);
  // const currUser = useAuth();

  // console.log(currUser);

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
        {!user && <Link to="/" className={currLocation === '/' ? 'active' : ""}>{flag?"Login":"Signup"}</Link>}
        <Link to="/podcasts" className={currLocation === '/podcasts' ? 'active' : ""}>Podcasts</Link>
        <Link to="/create-a-podcast" className={currLocation === '/create-a-podcast' ? 'active' : ""}>Create Podcast</Link>
        <Link to="/profile" className={currLocation === '/profile' ? 'active' : ""}>{user && currUser?`Hi, ${currUser.name}`:"Profile"}</Link>
        {
          user &&
          (<Link to="#" onClick={handleLogout}>Logout</Link>)
        }
      </div>
    </div>
  )
}

export default Header