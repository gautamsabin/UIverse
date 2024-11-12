import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchCategories,
  fetchElementScreenshot,
  fetchWebsites,
} from "../util/http";
import { findSubcategoryList } from "../util/findSubcategoryList";

export const UiverseContext = createContext(null);

export default function Contextprovider({ children }) {
  const [activeCategory, setActiveCategory] = useState("Websites");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [subCategoriesData, setSubCategoriesData] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [websiteDataWithElements, setWebsiteDataWithElements] = useState(null);

  // const { data: subCategoriesData } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: fetchCategories,
  // });

  const { data: allWebsiteData, isFetching: isFetchingWebsites } = useQuery({
    queryKey: ["websites"],
    queryFn: fetchWebsites,
    staleTime: 10000,
  });

  const { data: allElementScreenshotData } = useQuery({
    queryKey: ["elementScreenshot"],
    queryFn: fetchElementScreenshot,
    staleTime: 10000,
  });

  useEffect(() => {
    let elementData;
    if (activeCategory === "UI Elements") {
      elementData = Object.fromEntries(
        allElementScreenshotData?.map((data) => [
          data?.website?._id,
          { element: data?.element, imageUrl: data?.imageUrl },
        ])
      );

      console.log("element map in context =======>", elementData);
      const websiteDataWithElements = allWebsiteData
        ?.map((websiteData) => ({
          ...websiteData,
          element: elementData[websiteData?.website?._id],
        }))
        .filter((data) => typeof data?.element === "object");

      setWebsiteDataWithElements(websiteDataWithElements);
    }
  }, [activeCategory, allElementScreenshotData]);

  useEffect(() => {
    let subCategoriesData;
    switch (activeCategory) {
      case "Websites":
        subCategoriesData = findSubcategoryList(allWebsiteData, activeCategory);
        break;
      case "Type System":
        subCategoriesData = findSubcategoryList(allWebsiteData, activeCategory);
        break;
      case "Color System":
        subCategoriesData = findSubcategoryList(allWebsiteData, activeCategory);
        break;
      case "UI Elements":
        subCategoriesData = findSubcategoryList(
          allElementScreenshotData,
          activeCategory
        );
      default:
        break;
    }

    setSubCategoriesData(subCategoriesData);
  }, [activeCategory, allWebsiteData]);

  console.log(
    "Categories in Contextprovider :=============>>>>>>>>",
    subCategoriesData
  );
  console.log(
    "allElementData in Contextprovider:------->>",
    websiteDataWithElements
  );

  const contextValue = {
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    subCategoriesData,
    allWebsiteData,
    websiteDataWithElements,
    searchValue,
    setSearchValue,
    isFetchingWebsites,
  };
  return (
    <UiverseContext.Provider value={contextValue}>
      {children}
    </UiverseContext.Provider>
  );
}
