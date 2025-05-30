import React from "react";

const MovieCompHeader = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="text-2xl font-bold text-center py-2">
          Search Your Favorite Movie
        </div>
        <div>
          <input
            type="text"
            className="border-2 rounded-xl text-black p-2"
            placeholder="Enter movie Name"
          />
        </div>
      </div>
    </>
  );
};

export default MovieCompHeader;
