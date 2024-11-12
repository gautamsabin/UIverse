import React from "react";
import { useContext } from "react";

import { UiverseContext } from "../../Context/Context";
import "./search-tooltip.css";
import right from "../../assets/images/greater-than.svg";

const SearchTooltip = ({ setIsSearching }) => {
  const {
    activeCategory,
    setActiveCategory,
    setActiveSubcategory,
    subCategoriesData,
  } = useContext(UiverseContext);

  const limit = 20;

  const handleSubcategoryClick = (value) => {
    setActiveSubcategory(value);
    setIsSearching(false);
  };

  return (
    <div className="tooltip">
      <div className="searchbar-category-container">
        {["Websites", "UI Elements", "Color System", "Type System"].map(
          (category, index) => (
            <div
              key={index}
              className={
                activeCategory === category
                  ? "searchbar-category active"
                  : "searchbar-category"
              }
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              {activeCategory === category && <img src={right} />}
            </div>
          )
        )}
      </div>
      <div className="searchbar-subcategory-container">
        <div className="heading">Explore Categories</div>
        <div className="searchbar-subcategory">
          {subCategoriesData.slice(0, limit)?.map((subCategory, index) => (
            <div
              key={index}
              className="searchbar-subcategory-title"
              onClick={() => handleSubcategoryClick(subCategory?.name)}
            >
              {subCategory?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTooltip;
