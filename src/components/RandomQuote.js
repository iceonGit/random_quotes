import React, { useState, useEffect } from "react";
import Tags from "./Tags";
import Favorite from "./Favorites";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RandomQuote = ({ tags }) => {
  const [quote, setQuote] = useState("..loading next quote");
  const [author, setAuthor] = useState("");
  const [tagQuery, setTagQuery] = useState([]);
  const [bookMarks, setBookmarks] = useState([]);

  const location = useLocation();

  let apiUrl = "https://api.quotable.io/random";

  useEffect(() => {
    if (tagQuery.length) {
      apiUrl += `?tags=${tagQuery.join(",")}`;
    }

    const quoteGen = async () => {
      const config = {
        headers: {
          accept: "application/json",
        },
      };

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.statusCode === 404) {
        const url = "https://api.quotable.io/random";
        const res = await fetch(url);
        const data = await res.json();

        setQuote(data.content);
        setAuthor(data.author);
      } else {
        setQuote(data.content);
        setAuthor(data.author);
      }
    };

    quoteGen();
  }, [tagQuery]);

  //loading bookmarks from local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookMarks"));
    if (stored) {
      setBookmarks(stored);
    }
  }, []);

  //use effect to update the bookmarks array only when the bookmarks state changes
  //ie when we click the favorite button

  useEffect(() => {
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  }, [bookMarks]);

  ///handling changes
  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTagQuery(selectedTags);
  };

  const handleBookMark = () => {
    setBookmarks([...bookMarks, { quote, author }]);
  };

  console.log(bookMarks);
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(/images/166.jpg)`,
        }}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-gray-700 mb-4">
              <q className="text-xl font-medium">{quote}</q>
              <p className="text-sm mt-2 text-right">{author}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <Tags
                tags={tags}
                tagQuery={tagQuery}
                handleTagChange={handleTagChange}
              />
            </div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setTagQuery([])}
            >
              Get random quote
            </button>
            <Favorite
              quote={quote}
              author={author}
              handleBookMark={handleBookMark}
            />
            {tagQuery && (
              <span className="mt-4 text-sm text-gray-500 flex justify-between">
                <span>Tags: {tagQuery.join(", ")}</span>
                <Link to="/bookmarks" state={{ bookMarks }}>
                  View Bookmarks
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomQuote;
