import React, { useState } from "react";
import InputComponent from "../../CommonComponents/CustomInputs/InputComponent";
import FileInput from "../../CommonComponents/CustomInputs/FileInput";
import ButtonComponent from "../../CommonComponents/CustomButtons/ButtonComponent";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    // console.log("Handle Signup..");
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        // creating user Account..
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Saving user Details into firebase..
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          profileImage: profileImage,
        });

        // Saving user Details in store/redux. / Call the redux action.
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            profileImage: profileImage,
          })
        );
        // console.log('user', user);
        toast.success("User has been created!");
        setLoading(false);
        // redirect to profile page..
        setIsSubmitted(true);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // throw an error
      if (!fullName && !email && !password) {
        toast.error("Please fill all details.");
      } else if (password !== confirmPassword) {
        toast.error("Password is not matching.");
      } else if (password.length < 6) {
        toast.error("Password length is less than 6.");
      }
      setLoading(false);
    }
  };
  const profileImageHandle = async (file) => {
    setLoading(true);
    console.log("Image: ", file);
    try{
      const imageRef = ref(storage, `userPhotos/${Date.now()}`);
      await uploadBytes(imageRef, file);

      const imageURL = await getDownloadURL(imageRef);
      setProfileImage(imageURL);
      toast.success("Image Uploaded");
      console.log("image url: ", imageURL);
      setLoading(false);
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="common">
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <FileInput
        text="Upload Profile Image"
        accept={"image/*"}
        id="Profile-image-input"
        fileHandelFunc={profileImageHandle}
        isSubmitted={isSubmitted}
      />
      <ButtonComponent
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </div>
  );
};

export default SignupForm;

// Upload profile image to Firebase Storage
// if (profileImage) {
//   const imageRef = ref(
//     storage,
//     `userPhotos/${auth.currentUser.uid}/${Date.now()}`
//   );
//   await uploadBytes(imageRef, profileImage);
//   const imageUrl = await getDownloadURL(imageRef);
//   // console.log("Image Url: ", imageUrl);
//   user.photoURL = imageUrl;
//   updateProfile(user, {photoURL: imageUrl});
// }
