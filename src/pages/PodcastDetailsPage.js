import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import ButtonComponent from "../components/CommonComponents/CustomButtons/ButtonComponent";
import EpisodeDetails from "../components/Podcasts/Episode";
import AudioPlayer from "../components/Podcasts/AudioPlayer";

// Here the logic is that first we will fetch that perticular podcast by using podcast uid, and the we will fetch all episodes of the podcast by using episode uid.

const PodcastDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  // fetching data of podcast from firebase..
  useEffect(() => {
    getData();
    //react-hooks/exhaustive-deps
  }, [id]);
  // function that we are passing in useEffect to fetch data..
  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Podcast data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  // Now here we are fetching single podcast episodes...
  useEffect(() => {
    const unsubscribe = onSnapshot(
      // 42 code line we are getting episodes..
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.log("Error fetching episodes: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <div className="common">
        {podcast.id && (
          <div className="podcast-wrapper">
            <div className="title-and-create-episode-btn">
              <h1 className="podcast-headings">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <ButtonComponent
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="bannerImage-wrapper">
              <img src={podcast.bannerImage} alt="bannerImage" />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-headings">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p style={{ color: "var(--purple-grey)" }}>
                No Episodes available
              </p>
            )}
          </div>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage}/>}
    </div>
  );
};

export default PodcastDetailsPage;
