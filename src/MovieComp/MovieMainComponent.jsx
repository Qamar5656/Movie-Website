import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../Models/MovieCard";
import useLoadingStore from "../store/useLoadingStore";

const MovieMainComponent = () => {
  const [inputVal, setInputVal] = useState("");
  const [movies, setMovies] = useState([]);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Memoized function for fetching movies
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

  // Run once on mount to fetch popular movies
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Filter movies locally based on inputVal
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(inputVal.toLowerCase())
  );

  // Handle card click to navigate to detail page
  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container py-7">
      <h2 className="text-center font-bold text-xl py-3">Search Your Movie</h2>

      <div className="flex justify-center">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Search Movie"
          className="border p-2 rounded-xl focus:outline-blue-600"
        />
      </div>

      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              release_date={movie.release_date}
              description={movie.overview}
              handleClick={() => handleCardClick(movie.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No movies found
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieMainComponent;
