import React from "react";
import { Link } from "react-router-dom";

import "./card.css";
import { AiOutlineHeart } from "react-icons/ai";

const Card = ({ websiteData, activeCategory }) => {
  const logoUrl = websiteData?.pageScreenshots?.find(
    (data) => data?.page === "logo"
  );

  const landingPageUrl = websiteData?.pageScreenshots?.find(
    (data) => data?.page === "landing"
  );

  return (
    <div className="card">
      <Link to={`/card/${websiteData?.website?._id}`}>
        {activeCategory === "UI Elements" ? (
          <img className="element-img" src={websiteData?.element?.imageUrl} />
        ) : activeCategory === "Color System" ? (
          <div className="color-display">
            {websiteData?.website?.colors?.split(",").map((color, index) => (
              <div
                key={index}
                className="individual-color"
                style={{ backgroundColor: color.trim() }}
              ></div>
            ))}
          </div>
        ) : (
          <img
            className="card-image"
            src={landingPageUrl?.imageUrl}
            alt="card-image"
          />
        )}
      </Link>
      <div className="card-footer">
        <div className="color-container">
          {logoUrl && (
            <img className="logo-image" src={logoUrl?.imageUrl}></img>
          )}
        </div>

        <span className="card-title">{websiteData?.website?.name}</span>
        <AiOutlineHeart className="favourite-icon" />
      </div>
    </div>
  );
};

export default Card;
