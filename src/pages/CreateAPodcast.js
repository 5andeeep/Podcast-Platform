import React from "react";
import CreatePodcastForm from "../components/StartAPodcast";
import Header from "../components/CommonComponents/Header/Header";

const CreateAPodcast = () => {
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <h1>Start A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </>
  );
};

export default CreateAPodcast;
