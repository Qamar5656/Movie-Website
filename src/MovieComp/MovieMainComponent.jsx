import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../Models/MovieCard";
import useLoadingStore from "../store/useLoadingStore";

const MovieMainComponent = () => {
  const [inputVal, setInputVal] = useState("");
  const [debouncedInputVal, setDebouncedInputVal] = useState("");
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const setLoading = useLoadingStore((state) => state.setLoading);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Fetch popular movies on mount
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(false);
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    } finally {
      setLoading(true);
    }
  }, [API_KEY, BASE_URL, setLoading]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputVal(inputVal);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [inputVal]);

  // Filter movies using debounced input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedInputVal.toLowerCase())
  );

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  // Show only visibleCount number of filtered movies
  const visibleMovies = filteredMovies.slice(0, visibleCount);

  //handle delete functionality
  const handleDelete = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <div className="container py-7 pt-24">
      <h2 className="pr-4 text-center font-bold text-xl py-3">
        Search Your Movie
      </h2>

      <div className="flex justify-center w-full">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Search Movie"
          className="border-2 p-2 rounded-xl focus:outline-blue-600 w-1/2"
        />
      </div>

      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 px-4">
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              release_date={movie.release_date}
              description={movie.overview}
              handleClick={() => handleCardClick(movie.id)}
              handleDelete={() => handleDelete(movie.id)}
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
        <div className="flex items-center justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl cursor-pointer"
            onClick={() => setVisibleCount(filteredMovies.length)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieMainComponent;
