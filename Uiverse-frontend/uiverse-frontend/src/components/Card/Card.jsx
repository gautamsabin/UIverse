import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./card.css";
import { AiOutlineHeart } from "react-icons/ai";
import { addToFavourite, deleteFromFavourite } from "../../util/http";
import { useMutation } from "@tanstack/react-query";
import { UiverseContext } from "../../Context/Context";

const Card = ({ websiteData, activeCategory }) => {
  const { favouriteWebsiteData, refetchFavourites } =
    useContext(UiverseContext);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (activeCategory === "Favourites") {
      setIsFavourite(true);
    }

    const favouriteWebsiteId = favouriteWebsiteData?.map(
      (data) => data?.website?._id
    );

    if (favouriteWebsiteId?.includes(websiteData?.website?._id)) {
      setIsFavourite(true);
    }
  }, [websiteData, favouriteWebsiteData, activeCategory]);

  const { mutateAsync: addToFavouriteMutate } = useMutation({
    mutationFn: addToFavourite,
    onSuccess: () => {
      refetchFavourites();
    },
  });

  const { mutateAsync: deleteFromFavouriteMutate } = useMutation({
    mutationFn: deleteFromFavourite,
    onSuccess: () => {
      refetchFavourites();
    },
  });

  const logoUrl = websiteData?.pageScreenshots?.find(
    (data) => data?.page === "logo"
  );

  const landingPageUrl = websiteData?.pageScreenshots?.find(
    (data) => data?.page === "landing"
  );

  const [imgUrl, setImgUrl] = useState(landingPageUrl?.imageUrl);

  const handleFavouriteClick = async (websiteId) => {
    if (activeCategory === "Favourites") {
      try {
        const response = await deleteFromFavouriteMutate({ id: websiteId });
        console.log("add to favourite response is ====>", response);
      } catch (error) {
        console.error("Error occurred while deleting from favourite:", error);
      }
    } else {
      try {
        const res = await addToFavouriteMutate({
          userId: localStorage.getItem("userId"),
          websiteId: websiteId,
        });
        console.log("add to favourite response is ====>", res);
      } catch (error) {
        console.error("Error occurred while adding to favourite:", error);
      }
    }
  };

  useEffect(() => {
    if (activeCategory === "UI Elements") {
      setImgUrl(websiteData?.element?.imageUrl);
    }
  }, [activeCategory, websiteData]);

  return (
    <div
      className={
        activeCategory === "Websites" || activeCategory === "Type System"
          ? "card"
          : "card-ui"
      }
    >
      <Link
        to={`/card/${websiteData?.website?._id}`}
        state={{
          imgUrl,
          elementDetails: {
            pageType: websiteData?.element?.element,
            imageUrl: websiteData?.element?.imageUrl,
          },
        }}
      >
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
        <AiOutlineHeart
          className={
            isFavourite && localStorage.getItem("token")
              ? "favourite-icon-selected"
              : "favourite-icon"
          }
          onClick={() => handleFavouriteClick(websiteData?.website?._id)}
        />
      </div>
    </div>
  );
};

export default Card;
