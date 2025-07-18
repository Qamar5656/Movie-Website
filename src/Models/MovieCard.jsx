import { useState } from "react";

const MovieCard = ({
  img,
  title,
  rating,
  description,
  release_date,
  handleClick,
}) => {
  const stars = Math.round(rating); // Round to nearest integer (e.g. 7.8 → 8)
  const [wordsLen, setWordsLen] = useState(150);

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
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick();
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl"
    >
      <img src={img} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className="font-bold text-lg">{title}</p>
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
      </div>
    </div>
  );
};

export default MovieCard;
