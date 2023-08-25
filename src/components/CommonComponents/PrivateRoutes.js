import React from 'react'
import { auth } from '../../firebase'
import {useAuthState}  from 'react-firebase-hooks/auth';
import { Outlet, Navigate } from 'react-router-dom';
import Loading from './Loading';


const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth)

  if(loading){
    return <Loading/>;
  }
  else if(!user || error){
    return <Navigate to='/' replace />;
  }
  else{
    return <Outlet />;
  }
}

export default PrivateRoutes;