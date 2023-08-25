import React from "react";
import './style.css';

const GenreDropdown = ({genre, setGenre}) => {
  return (
    <div className="custom-input" style={{padding: "0.5rem"}}>
      <select class="dropdown-input" value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option  selected>
          Select Genre
        </option>
        <option value="Entertainment">Entertainment</option>
        <option value="Philosophy">Philosophy</option>
        <option value="Literature">Literature</option>
        <option value="History">History</option>
        <option value="Arts">Arts</option>
        <option value="Career">Career</option>
        <option value="Sports">Sports</option>
      </select>
    </div>
  );
};

export default GenreDropdown;
