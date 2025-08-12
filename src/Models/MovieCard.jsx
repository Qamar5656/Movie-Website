import { useState } from "react";

const MovieCard = ({
  img,
  title,
  rating,
  description,
  release_date,
  handleClick,
  handleUpdate,
  handleDelete,
}) => {
  const stars = Math.round(rating); // Round to nearest integer (e.g. 7.8 → 8)
  const [wordsLen, setWordsLen] = useState(150);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleWordsDisplay = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    setWordsLen((description || "").length);
  };

  const shortdescription = (description || "").slice(0, wordsLen);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl"
    >
      <img src={img} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className="font-bold text-lg">
          {editMode ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded p-1 w-full mb-2"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="font-bold text-lg">{title}</p>
          )}
        </p>
        <div className="text-yellow-500 text-sm mb-1">
          {Array(stars)
            .fill("⭐")
            .map((star, index) => (
              <span key={index}>{star}</span>
            ))}
        </div>
        <p className="text-sm text-gray-600">Rating: {rating.toFixed(1)}</p>
        <p className="text-sm text-gray-600">Release Date: {release_date}</p>

        <p className="text-sm text-gray-600">
          {shortdescription}
          {description && description.length > wordsLen && (
            <button
              onClick={handleWordsDisplay}
              className="px-4 font-bold cursor-pointer"
            >
              Load More
            </button>
          )}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="cursor-pointer text-red-500 hover:text-red-700 font-bold mt-2 border border-red-500 px-2 py-1 rounded"
        >
          Delete
        </button>

        {/* Action Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditMode(!editMode);
            if (editMode) handleUpdate(newTitle);
          }}
          className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-bold px-2 py-1 rounded mx-4 cursor-pointer"
        >
          {editMode ? "Save" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
