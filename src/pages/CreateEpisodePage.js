import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/CommonComponents/CustomInputs/InputComponent";
import FileInput from "../components/CommonComponents/CustomInputs/FileInput";
import ButtonComponent from "../components/CommonComponents/CustomButtons/ButtonComponent";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisodePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    if (title && desc && audioFile && id) {
      setLoading(true);
      try {
        // uploading episode data in firebase..
        const audioRef = ref(
            storage,
            `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        // using uploadBytes to upload episode..
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
            title: title,
            description: desc,
            audioFile: audioURL
        }
        // here we are adding this episode data in the firebase db=>podcasts=>id=>episodes
        await addDoc(
            collection(db, 'podcasts', id, 'episodes'),
            episodeData
        );
        toast.success("Episode Created");
        navigate(`/podcast/${id}`);
        setAudioFile("");
        setTitle("");
        setDesc("");
        setIsSubmitted(true);
        setLoading(false);
      } 
      catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All Details Required.");
      setLoading(false);
    }
  };

  return (
    <div className="common">
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="Episode Title"
          type="text"
          required={true}
        />
        <InputComponent
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          text={"Upload Audio File"}
          accept={"audio/*"}
          id="audio-file-input"
          fileHandelFunc={audioFileHandle}
          isSubmitted={isSubmitted}
        />
        <ButtonComponent
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateEpisodePage;
