import React from "react";

const Tags = ({ tags, tagQuery, handleTagChange }) => {
  return (
    <select
      id="tags"
      name="tags"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      multiple
      value={tagQuery}
      onChange={handleTagChange}
    >
      {tags.map((tag, index) => (
        <option key={index} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
};

export default Tags;
