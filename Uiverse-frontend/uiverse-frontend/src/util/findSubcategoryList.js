import namer from "color-namer";
import tinycolor from "tinycolor2";

export function getColorName(hex) {
  const validColor = tinycolor(hex).toHexString();

  const name = namer(validColor).basic[0].name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
export function findSubcategoryList(dataList, category) {
  console.log("in reusable funciton ====>", dataList, category);
  let subCategoryData;
  if (category === "Websites") {
    subCategoryData = dataList?.map((data) => data?.website?.category);
  }

  if (category === "Type System") {
    subCategoryData = dataList?.flatMap((item) =>
      item?.website?.fonts
        ?.split(",")
        .map((font) => font.trim())
        .map((font) => ({
          _id: item?.website?._id,
          name: font
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
        }))
    );
  }

  // if (category === "Type System") {
  //   subCategoryData = dataList?.flatMap((item) =>
  //     item?.website?.fonts.split(",").map((font) => ({
  //       _id: item?.website?._id,
  //       name: font,
  //     }))
  //   );
  // }

  if (category === "Color System") {
    subCategoryData = dataList?.flatMap((item) =>
      item?.website?.colors
        ?.split(",")
        .map((color) => color.trim())
        .map((color) => ({ hex: color, name: getColorName(color) }))
    );
  }

  if (category === "UI Elements") {
    subCategoryData = dataList?.map((data) => ({
      name: data?.element?.charAt(0).toUpperCase() + data?.element?.slice(1),
    }));
  }

  const uniqueSubCategoryData = subCategoryData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );

  console.log(
    "unique sub category data inside reusable function === ======>",
    uniqueSubCategoryData,
    subCategoryData
  );
  return uniqueSubCategoryData;
}
