import React from "react";
import "./search-category.css";

import filterLogo from "../../assets/images/filter-logo.svg";

import { useContext } from "react";
import { UiverseContext } from "../../Context/Context";

const Searchcategory = () => {
  const { activeCategory, setActiveCategory } = useContext(UiverseContext);

  return (
    <div className="search-category">
      {["Websites", "UI Elements", "Color System", "Type System"].map(
        (category, index) => (
          <button
            key={index}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        )
      )}

      <div className="filter-image-container">
        <img src={filterLogo} className="filter-img"></img>
      </div>
    </div>
  );
};

export default Searchcategory;
