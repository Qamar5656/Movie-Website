// const API_KEY = "3786da60f8b051b02ff564459f8d1c3d";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "/src/Models/MovieCard";
import useLoadingStore from "../store/useLoadingStore";

const MovieCompBody = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [movies, setMovies] = useState([]);
  const [inputval, setInputVal] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const API_KEY = "3786da60f8b051b02ff564459f8d1c3d";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(false);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(true);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies by search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(inputval.toLowerCase())
  );

  // Show only visibleCount number of filtered movies
  const visibleMovies = filteredMovies.slice(0, visibleCount);

  return (
    <div className="px-4">
      {/* Search Input */}
      <div className="flex flex-col items-center justify-center my-6">
        <h2 className="text-2xl font-bold mb-4">Search Your Favorite Movie</h2>
        <input
          type="text"
          value={inputval}
          className="border-2 focus:outline-blue-600 rounded-xl text-black p-2 w-80"
          placeholder="Enter movie name"
          onChange={(e) => {
            setInputVal(e.target.value);
            setVisibleCount(9); // reset to first 9 when user types
          }}
        />
      </div>

      {/* Movie Grid */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No movies found
          </p>
        )}
      </div>

      {/* Load More Button */}
      {filteredMovies.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => setVisibleCount(filteredMovies.length)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCompBody;
