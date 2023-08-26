import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonComponent from "../components/CommonComponents/CustomButtons/ButtonComponent";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Loading from "../components/CommonComponents/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import PodcastCard from "../components/Podcasts/PodcastCard";
import Header from "../components/CommonComponents/Header/Header";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [podcasts, setPodcasts] = useState([]);

  // const [currentUser, setCurrentUser] = useState(user);
  // useEffect(() => {
  //   console.log("this is currentUser ", currentUser);
  // }, [user])

  // fetching podcast data to show that if use has created some podcast, showing on profile page...
  useEffect(() => {
    const fetchDocs = async () => {
      const fetchPd = query(
        collection(db, "podcasts"),
        where("createdBy", "==", user.uid)
      );
      const qSnapShot = await getDocs(fetchPd);
      const docsData = qSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPodcasts(docsData);
    };
    if (user) {
      fetchDocs();
    }
  }, [user]);

  // Logic for Logout button using auth from firebase..
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (!user) {
    return <Loading />;
  }

  return (
    <>
    <Header />
      <div className="profilePage">
        <div className="wrapper">
          <div className="image-wrapper">
            <img src={user.profileImage} alt="profileImage" />
          </div>
          <div className="info-wrapper">
            <h1 className="info-h1">Name: {user.name}</h1>
            <h1 className="info-h1">Email: {user.email}</h1>
            {/* <h1>UID: {user.uid}</h1> */}
            <div className="logout-edit-btn">
              <ButtonComponent text={"Logout"} onClick={handleLogout} />
              <ButtonComponent text={"Edit Profile"} />
            </div>
          </div>
        </div>
        <div className="your-podcasts">
          <h1 className="title-h1">Your Podcasts</h1>
          {podcasts.length > 0 ? (
            <div className="podcasts-flex">
              {podcasts.map((item) => {
                return (
                  <PodcastCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    displayImage={item.displayImage}
                  />
                );
              })}
            </div>
          ) : (
            <div className="your-podcasts">
              <p className="noPodcast-message">No Podcast Available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
