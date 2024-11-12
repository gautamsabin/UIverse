import React from "react";


import Boxcontainer from "../components/Boxcontainer/Boxcontainer";
import SearchSubcategory from "../components/SearchSubcategory/SearchSubcategory";
import Searchcategory from "../components/Searchcategory/SearchCategory";
import CardContainer from "../components/CardContainer/CardContainer";

const Home = () => {
  return (
    <>
      <Boxcontainer>
        <div>
          <p className="head-text">Explore real-world designs</p>
        </div>

        <Searchcategory />
        <SearchSubcategory />
        <CardContainer />
      </Boxcontainer>
    </>
  );
};

export default Home;
