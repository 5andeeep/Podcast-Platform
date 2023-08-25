import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../src/components/CommonComponents/Header/Header';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import CreateEpisodePage from './pages/CreateEpisodePage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/CommonComponents/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';

function App() {
  const dispatch = useDispatch();
  useEffect(() =>{
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if(user){
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profileImage: userData.profileImage,
                })
              );
            }
          },
          (error) => {
            console.log("Error while fetching user data: ", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth()
    };
  }, [dispatch]);


  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' Component={SignUpPage} />
        <Route Component={PrivateRoutes}>
          <Route path='/profile' Component={ProfilePage} />
          <Route path='/create-a-podcast' Component={CreateAPodcast} />
          <Route path='/podcasts' Component={PodcastsPage} />
          <Route path='/podcast/:id' Component={PodcastDetailsPage} />
          <Route path='/podcast/:id/create-episode' Component={CreateEpisodePage} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
