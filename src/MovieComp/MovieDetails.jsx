import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //to fetch movies data
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

    //to fetch movies images for image gallery
    const fetchMovieImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/images`, {
          params: { api_key: API_KEY },
        });
        setImages(response.data.backdrops.slice(0, 8)); // Limit to 8 images
        setSelectedImage(response.data.backdrops[0]); // Default selected
      } catch (error) {
        console.error("Failed to fetch movie images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    fetchMovieImages();
  }, [id, API_KEY, BASE_URL]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>No details found for this movie.</div>;

  return (
    <>
      <div className="container p-5">
        <h1 className="text-3xl font-bold mb-4 text-center">{movie.title}</h1>

        <div className="flex items-center justify-center">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-3">Gallery</h2>

              {/* Selected main image */}
              <div className="mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w780${selectedImage?.file_path}`}
                  alt="Selected"
                  className="rounded-lg w-full max-h-[400px] object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
                    alt={`thumb-${index}`}
                    className={`cursor-pointer rounded-md border-2 ${
                      img.file_path === selectedImage?.file_path
                        ? "border-2 border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="my-4 w-74 rounded-2xl h-64"
          /> */}
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
      </div>
    </>
  );
};

export default MovieDetails;
