import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "/src/Models/MovieCard";
import useLoadingStore from "../store/useLoadingStore";

const MovieCompBody = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(false); // show spinner
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(true); // hide spinner
      }
    };

    fetchMovies();
  }, [setLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
          rating={movie.vote_average}
          category="Popular"
        />
      ))}
    </div>
  );
};

export default MovieCompBody;
