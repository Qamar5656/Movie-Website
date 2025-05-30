const MovieCard = ({ img, title, rating, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      <img src={img} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm text-gray-600">⭐ {rating}</p>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default MovieCard;
