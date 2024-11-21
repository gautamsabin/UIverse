import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Boxcontainer from "../components/Boxcontainer/Boxcontainer";
import { useQuery } from "@tanstack/react-query";
import { fetchOneWebsite } from "../util/http";
import "./CSS/card-details.css";
import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { UiverseContext } from "../Context/Context";

const CardDetails = () => {
  const { activeCategory } = useContext(UiverseContext);
  const { cardId } = useParams();

  const location = useLocation();

  const { imgUrl, elementDetails } = location?.state || {};

  const [mainDisplayContent, setMainDisplayContent] = useState({
    imgUrl,
    selectedWebsitePage:
      activeCategory === "UI Elements" ? elementDetails?.pageType : "landing",
  });
  const [moreWebsiteData, setMoreWebsiteData] = useState(null);

  const { data } = useQuery({
    queryKey: ["website", { searchId: cardId }],
    queryFn: () => fetchOneWebsite(cardId),
  });

  // const landingPageUrl = data?.pageScreenshotsData?.find(
  //   (data) => data?.pageType === "landing"
  // ).imageUrl;

  useEffect(() => {
    let moreWebsiteData = data?.pageScreenshotsData;

    if (
      activeCategory === "UI Elements" &&
      !moreWebsiteData?.includes(elementDetails)
    ) {
      moreWebsiteData?.push(elementDetails);
    }

    moreWebsiteData = moreWebsiteData?.filter(
      (data) =>
        data?.pageType !== mainDisplayContent?.selectedWebsitePage &&
        data?.pageType !== "logo"
    );

    setMoreWebsiteData(moreWebsiteData);
  }, [data, mainDisplayContent]);

  const colorsArray = data?.website?.colors?.split(",");

  const formattedDate = moment(data?.website?.updatedAt).format("MMMM YYYY");

  const handleMoreWebsiteDataClick = ({ url, pageType }) => {
    setMainDisplayContent({ imgUrl: url, selectedWebsitePage: pageType });
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  console.log("more website data is ;;;;;;;;;;;;;;;>", moreWebsiteData);
  return (
    <Boxcontainer>
      <div className="individual-website-container">
        <div className="top-section">
          <div className="image-container">
            <img
              className="landing-page-img"
              src={mainDisplayContent?.imgUrl}
            />
          </div>
          <div className="individual-website-information">
            <div className="website-header">
              <span className="individual-website-title">
                {data?.website?.name}
              </span>
              <span className="website-description">
                {data?.website?.description}
              </span>
            </div>

            <div className="website-body">
              <div className="website">
                <span className="title">Fonts</span>
                <span className="content">{data?.website?.fonts}</span>
              </div>
              <div className="website">
                <span className="title">Colors</span>
                <div className="color-wrapper">
                  {colorsArray?.map((value, index) => (
                    <span
                      key={index}
                      className="color"
                      style={{ backgroundColor: value }}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="website">
                <span className="title">Category</span>
                <span className="content">{data?.website?.category?.name}</span>
              </div>
              <div className="website">
                <span className="title">Date</span>
                <span className="content">{formattedDate}</span>
              </div>
            </div>

            <a
              className="website-redirect-button"
              href={data?.website?.url}
              target="_blank"
            >
              Visit Website
            </a>
          </div>
        </div>
        {moreWebsiteData && (
          <div className="bottom-section">
            <span className="more-website-heading">More from this website</span>
            <div className="more-website-datas">
              {moreWebsiteData?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="more-data-container"
                    onClick={() =>
                      handleMoreWebsiteDataClick({
                        url: data?.imageUrl,
                        pageType: data?.pageType,
                      })
                    }
                  >
                    <img className="more-website-img" src={data?.imageUrl} />
                    <div className="more-data-title">
                      <span>{data?.pageType}</span>
                      <AiOutlineHeart className="addtofavourite-icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Boxcontainer>
  );
};

export default CardDetails;
