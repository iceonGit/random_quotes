import React from "react";
import { BsBookmark } from "react-icons/bs";

const Favorite = ({ quote, author, handleBookMark }) => {
  return (
    <div className="text-right mt-4">
      <button
        className="text-blue-600 hover:fill-black"
        onClick={() => handleBookMark({ quote, author })}
      >
        <BsBookmark />
      </button>
    </div>
  );
};

export default Favorite;
