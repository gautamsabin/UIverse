import React from "react";
import { useContext, useRef, useState, useEffect } from "react";

import "./search-subcategory.css";
import { UiverseContext } from "../../Context/Context";
import right from "../../assets/images/greater-than.svg";
import left from "../../assets/images/less-than.svg";

const SearchSubcategory = () => {
  const {
    activeSubcategory,
    activeCategory,
    setActiveSubcategory,
    subCategoriesData,
  } = useContext(UiverseContext);

  const scrollContainerRef = useRef();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setActiveSubcategory("All");
  }, [activeCategory]);

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth - container.scrollLeft > container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "right" ? 100 : -100;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkOverflow, 10);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  useEffect(() => {
    if (subCategoriesData?.length > 0) {
      checkOverflow();
    }
  }, [subCategoriesData, activeCategory]);

  console.log("sub-category is => ", subCategoriesData);

  return (
    <div className="search-subcategory-container">
      {canScrollLeft && (
        <div className="arrow-container" onClick={() => scroll("left")}>
          <img src={left} alt="Scroll Left" />
        </div>
      )}
      <div className="search-subcategory" ref={scrollContainerRef}>
        <span
          className={activeSubcategory === "All" ? "active" : ""}
          onClick={() => setActiveSubcategory("All")}
        >
          All
        </span>
        {subCategoriesData?.map((subCategory, index) => (
          <span
            key={index}
            className={activeSubcategory === subCategory.name ? "active" : ""}
            onClick={() => setActiveSubcategory(subCategory.name)}
          >
            {subCategory.name}
          </span>
        ))}
      </div>
      {canScrollRight && (
        <div className="arrow-container" onClick={() => scroll("right")}>
          <img src={right} alt="Scroll Right" />
        </div>
      )}
    </div>
  );
};

export default SearchSubcategory;
