import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams(); // get movie id from URL params
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY, BASE_URL]);

  if (loading) {
    return <div>`</div>;
  }

  if (!movie) {
    return <div>No details found for this movie.</div>;
  }

  return (
    <div className="container p-5">
      <h1 className="text-3xl font-bold mb-4 text-center">{movie.title}</h1>
      <div className="flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className=" my-4 w-74 rounded-2xl h-64"
        />
      </div>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieDetails;
