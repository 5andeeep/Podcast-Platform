import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/CommonComponents/CustomInputs/InputComponent";
import GenreButton from "../components/CommonComponents/GenreButton";
import Header from "../components/CommonComponents/Header/Header";

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  // We care fetching all podcast from firebase..
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        // setCurrentPodcast(podcastsData);
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // search input filter logic..
  var filteredPodcasts = podcasts.filter((item) =>
  {
    if(genre=="All"){
      return item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    }
    else{
    return item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) && item.genre==genre
    }
  }
  );


  const handleGenreFilter = (genre) => {
    setGenre(genre);
  };

  return (
    <>
    <Header />
      <div className="podcastsPage">
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />
        <div className="genre-btn-wrapper">
          <GenreButton
            text={"All"}
            genre={genre}
            onClick={() => setGenre("All")}
          />
          <GenreButton
            text={"Entertainment"}
            genre={genre}
            onClick={() => setGenre("Entertainment")}
          />
          <GenreButton
            text={"Philosophy"}
            genre={genre}
            onClick={() => setGenre("Philosophy")}
          />
          <GenreButton
            text={"Literature"}
            genre={genre}
            onClick={() => setGenre("Literature")}
          />
          <GenreButton
            text={"History"}
            genre={genre}
            onClick={() => setGenre("History")}
          />
          <GenreButton
            text={"Arts"}
            genre={genre}
            onClick={() => setGenre("Arts")}
          />
          <GenreButton
            text={"Career"}
            genre={genre}
            onClick={() => setGenre("Career")}
          />
          <GenreButton
            text={"Sports"}
            genre={genre}
            onClick={() => setGenre("Sports")}
          />
        </div>
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((item) => {
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
          <p>{search ? "No Podcast Found" : "No Podcast On The Platform"}</p>
        )}
      </div>
    </>
  );
};

export default PodcastsPage;
