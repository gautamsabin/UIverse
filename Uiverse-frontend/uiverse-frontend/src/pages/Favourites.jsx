import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UiverseContext } from "../Context/Context";
import Card from "../components/Card/Card";
import Boxcontainer from "../components/Boxcontainer/Boxcontainer";
import "./CSS/favourites.css";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [favouriteData, setFavouriteData] = useState(null);
  const { allWebsiteData, favouriteWebsiteData, token, searchValue } =
    useContext(UiverseContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  console.log(
    "search value in favourites is ================>>>>",
    searchValue,
    favouriteData
  );

  useEffect(() => {
    const favouriteWebsiteId = favouriteWebsiteData?.map(
      (data) => data?.website?._id
    );

    let favouriteData = allWebsiteData?.filter((data) =>
      favouriteWebsiteId?.includes(data?.website?._id)
    );

    if (searchValue?.length > 0) {
      favouriteData = favouriteData?.filter((websiteData) =>
        websiteData?.website?.name
          ?.toLowerCase()
          .includes(searchValue?.toLowerCase())
      );
    }

    setFavouriteData(favouriteData);
  }, [allWebsiteData, favouriteWebsiteData, searchValue]);
  return (
    <Boxcontainer>
      <div className="favourites-container">
        <span className="favourites">Favourites</span>
        <div className="card-container">
          {favouriteData?.length === 0 ? (
            <div className="loader">No Result Found!</div>
          ) : (
            favouriteData?.map((websiteData, index) => (
              <Card
                key={websiteData?.website?._id}
                websiteData={websiteData}
                activeCategory="Favourites"
              />
            ))
          )}
        </div>
      </div>
    </Boxcontainer>
  );
};

export default Favourites;
