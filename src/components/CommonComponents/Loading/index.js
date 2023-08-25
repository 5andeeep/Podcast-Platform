import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        {/* <CircularProgress color="inherit" /> */}
        <span className="loader"></span>
        {/* <p>Loading...</p> */}
      </Backdrop>
    </div>
  );
}
