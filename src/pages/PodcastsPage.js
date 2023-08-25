import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/CommonComponents/CustomInputs/InputComponent";
import GenreButton from "../components/CommonComponents/GenreButton";

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [isSelected, setIsSelected] = useState(false);

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
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  // useEffect(() => {
  //   setFilteredPodcasts(podcasts);
  // }, []);
  const handleGenreFilter = (genre) => {
    const filterGenre = podcasts.filter((item) => {
      return item.genre === genre;
    });
    setIsSelected(true);
    console.log(filterGenre);
    // setFilteredPodcasts(filterGenre);
  };

  return (
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
          isSelected={isSelected}
          onClick={() => handleGenreFilter(filteredPodcasts)}
        />
        <GenreButton
          text={"Entertainment"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Entertainment")}
        />
        <GenreButton
          text={"Philosophy"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Philosophy")}
        />
        <GenreButton
          text={"Literature"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Literature")}
        />
        <GenreButton
          text={"History"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("History")}
        />
        <GenreButton
          text={"Arts"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Arts")}
        />
        <GenreButton
          text={"Career"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Career")}
        />
        <GenreButton
          text={"Sports"}
          isSelected={isSelected}
          onClick={() => handleGenreFilter("Sports")}
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
  );
};

export default PodcastsPage;
