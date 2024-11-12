import React, { useEffect, useState } from "react";
import { useContext } from "react";

import Card from "../Card/Card";
import { UiverseContext } from "../../Context/Context";
import { getColorName } from "../../util/findSubcategoryList";

import "./card-container.css";

const CardContainer = () => {
  const {
    activeSubcategory,
    activeCategory,
    allWebsiteData,
    websiteDataWithElements,
    isFetchingWebsites,
    searchValue,
  } = useContext(UiverseContext);

  console.log("Search value in cardcontainer =>", searchValue);
  const [filteredWebsiteData, setFilteredWebsiteData] = useState(
    activeCategory === "UI Elements" ? websiteDataWithElements : allWebsiteData
  );

  useEffect(() => {
    let filteredData =
      activeCategory === "UI Elements"
        ? websiteDataWithElements
        : allWebsiteData;

    if (activeSubcategory !== "All" && activeCategory === "Websites") {
      filteredData = allWebsiteData?.filter(
        (data) => data?.website?.category?.name === activeSubcategory
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "Type System") {
      filteredData = allWebsiteData?.filter((data) =>
        data?.website?.fonts
          ?.split(",")
          .map((font) => font.trim())
          .map((font) =>
            font
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          )
          .includes(activeSubcategory)
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "Color System") {
      filteredData = allWebsiteData?.filter((data) =>
        data?.website?.colors
          ?.split(",")
          .map((color) => color.trim())
          .map((color) => getColorName(color))
          .includes(activeSubcategory)
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "UI Elements") {
      filteredData = websiteDataWithElements?.filter(
        (data) =>
          data?.element?.element?.charAt(0).toUpperCase() +
            data?.element?.element?.slice(1) ===
          activeSubcategory
      );
    }

    if (searchValue.length > 0) {
      filteredData = filteredData?.filter((websiteData) =>
        websiteData?.website?.name
          ?.toLowerCase()
          .includes(searchValue?.toLowerCase())
      );
    }
    setFilteredWebsiteData(filteredData);
  }, [
    activeCategory,
    activeSubcategory,
    allWebsiteData,
    websiteDataWithElements,
    searchValue,
  ]);

  console.log("filtered SUBCATEGORY list is: ====>", filteredWebsiteData);
  console.log("all website data is: ====>", allWebsiteData);
  return (
    <div
      className={
        activeCategory === "Color System" || activeCategory === "UI Elements"
          ? "color-card-container"
          : "card-container"
      }
    >
      {isFetchingWebsites && (
        <div className="loader">Loading Website Data...</div>
      )}
      {!isFetchingWebsites &&
        (filteredWebsiteData?.length === 0 ? (
          <div className="loader">No Result Found!</div>
        ) : (
          filteredWebsiteData?.map((websiteData, index) => (
            <Card
              key={websiteData?.website?._id}
              websiteData={websiteData}
              activeCategory={activeCategory}
            />
          ))
        ))}
    </div>
  );
};

export default CardContainer;
