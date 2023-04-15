import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { RiDeleteBinLine, RiHome2Line } from "react-icons/ri";

const Bookmarks = () => {
  const { state } = useLocation();
  const { bookMarks } = state;
  const [bookmarksList, setBookmarksList] = useState(
    JSON.parse(localStorage.getItem("bookMarks")) || bookMarks
  );

  const handleDelete = (index) => {
    const newBookmarks = [...bookmarksList];
    const deletedQuote = newBookmarks.splice(index, 1)[0];
    localStorage.setItem("bookMarks", JSON.stringify(newBookmarks));
    setBookmarksList(newBookmarks);
    console.log(
      `Deleted quote: ${deletedQuote.quote} by ${deletedQuote.author}`
    );
  };

  return (
    <div
      className="bg-white h-screen py-10 px-20  sm:px-10 grid grid-cols-1 gap-1"
      style={{
        backgroundImage: `url(/images/166.jpg)`,
      }}
    >
      {bookmarksList &&
        bookmarksList.map(({ quote, author }, index) => {
          return (
            <div
              className="scale-80 bg-gray-600 bg-opacity-50 p-8 m-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out relative"
              key={author}
            >
              <div className="text-lg text-sky-100 font-medium" key={author}>
                {quote}
              </div>
              <div className="text-sm text-white mt-2" key={quote}>
                {author}
              </div>
              <button
                className="absolute top-2 right-2"
                onClick={() => handleDelete(index)}
              >
                <RiDeleteBinLine className="text-red-200 w-6 h-6  ml-6 mr-3 mt-1" />
              </button>
            </div>
          );
        })}
      <div className="fixed m-auto bottom-10 right-10 bg-gray-900 rounded-full p-4">
        <Link to="/">
          <RiHome2Line className="text-3xl text-green-400" />
        </Link>
      </div>
    </div>
  );
};

export default Bookmarks;
