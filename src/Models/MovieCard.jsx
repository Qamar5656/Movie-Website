const MovieCard = ({ img, title, rating, description }) => {
  const stars = Math.round(rating); // Round to nearest integer (e.g. 7.8 → 8)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl">
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
        <p className="text-sm text-gray-600">Description: {description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
