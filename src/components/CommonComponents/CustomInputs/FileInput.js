import "./style.css";
import React, { useState } from "react";

const FileInput = ({ accept, id, fileHandelFunc, text, isSubmitted }) => {
  const [fileSelected, setFileSelected] = useState(null);

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandelFunc(e.target.files[0]);
  };

  return (
    <>
      <label htmlFor={id} className={`file-input ${!fileSelected ? "label-input" : "active"}`}>
        {!isSubmitted && fileSelected ? `${fileSelected} -- File Uploaded ` : `${text}`}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
};

export default FileInput;
