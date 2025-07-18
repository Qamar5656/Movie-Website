import React, { useEffect, useState } from "react";
import useLoadingStore from "../store/useLoadingStore";
import MovieCard from "../Models/MovieCard";

const MovieMainComponent = () => {
  const [inputVal, setInputVal] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const setLoading = useLoadingStore((state) => state.setLoading);

  console.log("API KEY:", API_KEY);
  console.log("BASE URL:", BASE_URL);

  useEffect(() => {
    setLoading(false);
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        // console.log(res.json());
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data is", data.results);
        setMovies(data.results);
      })
      .catch((err) => {
        console.log("Error fetching movies", err);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(inputVal.toLowerCase())
  );

  return (
    <>
      <div className="container py-7">
        <div>
          <h2 className="text-center font-bold text-xl py-3">
            Search Your Movie
          </h2>
        </div>
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
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              description={movie.overview}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieMainComponent;
