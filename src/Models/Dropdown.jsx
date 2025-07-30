import React from "react";

const Dropdown = ({ onRatingFilterChange }) => {
  const handleFilterChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "gt7":
        onRatingFilterChange(9);
        break;
      case "gt5":
        onRatingFilterChange(8);
        break;
      case "gt3":
        onRatingFilterChange(5);
        break;
      case "all":
      default:
        onRatingFilterChange(null);
    }
  };

  return (
    <section className="container pt-20">
      <select
        onChange={handleFilterChange}
        className="border rounded p-2 cursor-pointer"
      >
        <option value="all">All Ratings</option>
        <option value="gt7">Rating greater than 9</option>
        <option value="gt5">Rating greater than 8</option>
        <option value="gt3">Rating greater than 5</option>
      </select>
    </section>
  );
};

export default Dropdown;
