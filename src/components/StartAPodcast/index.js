import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../CommonComponents/CustomInputs/InputComponent";
import ButtonComponent from "../CommonComponents/CustomButtons/ButtonComponent";
import { toast } from "react-toastify";
import FileInput from "../CommonComponents/CustomInputs/FileInput";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection,} from "firebase/firestore";
import GenreDropdown from "../CommonComponents/GenreDropdownBar";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [genre, setGenre] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const navigate = useNavigate();

  // console.log("Genre selected: ", gerne);

  const handleSubmit = async () => {
    if(title && desc && displayImage && bannerImage){
      setLoading(true);
      // 1. Upload files -> get downloadable links
      try{
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        // console.log("banner image", bannerImageUrl);
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        // console.log("display image", displayImageUrl);
        const podcastData = {
          title: title,
          genre: genre,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        setIsSubmitted(true);
        toast.success("Podcast Created!");
        navigate("/podcasts");
        setLoading(false);
      }
      catch(e){
        toast.error(e.message);
        setLoading(false);
        console.log("Error", e);
      }
      // 2. create a new doc in a new collection called podcasts
      // 3. save these new podcast episodes states in our podcasts
    }
    else{
      toast.error("Please fill all requirements")
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };
  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <div className="common">
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="email"
        required={true}
      />
      <GenreDropdown genre={genre} setGenre={setGenre}/>    
      <FileInput 
        text="Upload Display Image"
        accept={"image/*"}
        id="display-image-input"
        fileHandelFunc={displayImageHandle}
        isSubmitted={isSubmitted}
      />
      <FileInput 
        text="Upload Banner Image"
        accept={"image/*"}
        id="banner-image-input"
        fileHandelFunc={bannerImageHandle}
        isSubmitted={isSubmitted}
      />
      <ButtonComponent
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreatePodcastForm;
