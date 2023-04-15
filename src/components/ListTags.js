import React, { useState, useEffect } from "react";
import RandomQuote from "./RandomQuote";

const ListTags = () => {
  const [tags, setTags] = useState(null);

  const tagGen = async () => {
    const apiUrl = "https://api.quotable.io/tags";
    const res = await fetch(apiUrl);
    const data = await res.json();
    const tagsArray = data.map((item) => item.slug);

    console.log(tags);
    setTags(tagsArray);
  };

  useEffect(() => {
    tagGen();
  }, []);

  return (
    <>
      {tags === null ? <div>Loading tags...</div> : <RandomQuote tags={tags} />}
    </>
  );
};

export default ListTags;
