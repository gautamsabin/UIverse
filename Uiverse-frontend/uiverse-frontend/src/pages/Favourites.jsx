import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UiverseContext } from "../Context/Context";
import Card from "../components/Card/Card";
import Boxcontainer from "../components/Boxcontainer/Boxcontainer";
import "./CSS/favourites.css";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [favouriteData, setFavouriteData] = useState(null);
  const { allWebsiteData, favouriteWebsiteData, token } =
    useContext(UiverseContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const favouriteWebsiteId = favouriteWebsiteData?.map(
      (data) => data?.website?._id
    );

    const favouriteData = allWebsiteData?.filter((data) =>
      favouriteWebsiteId?.includes(data?.website?._id)
    );

    setFavouriteData(favouriteData);
  }, [allWebsiteData, favouriteWebsiteData]);
  return (
    <Boxcontainer>
      <div className="favourites-container">
        <span className="favourites">Favourites</span>
        <div className="card-container">
          {favouriteData?.map((websiteData, index) => (
            <Card
              key={websiteData?.website?._id}
              websiteData={websiteData}
              activeCategory="Favourites"
            />
          ))}
        </div>
      </div>
    </Boxcontainer>
  );
};

export default Favourites;
