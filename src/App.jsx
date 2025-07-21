import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCompBody from "./MovieComp/MovieCompBody";
import useLoadingStore from "./store/useLoadingStore";
import MovieMainComponent from "./MovieComp/MovieMainComponent";
import MovieDetails from "./MovieComp/MovieDetails";

function App() {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <>
      {!loading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
        </div>
      )}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieMainComponent />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
