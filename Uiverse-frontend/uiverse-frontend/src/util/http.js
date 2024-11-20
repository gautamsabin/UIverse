import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

const baseUrl = "https://uidiscover-backend.onrender.com/api";

export async function fetchCategories() {
  const url = `${baseUrl}/category`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the categories", error);
    throw new Error("An error occurred while fetching the categories");
  }
}

export async function fetchWebsites() {
  const url = `${baseUrl}/website`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the websites", error);
    throw new Error("An error occurred while fetching the websites");
  }
}

export async function fetchOneWebsite(websiteId) {
  const url = `${baseUrl}/website/${websiteId}`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the website", error);
    throw new Error("An error occurred while fetching the website");
  }
}

export async function fetchElementScreenshot() {
  const url = `${baseUrl}/elementScreenshot`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the website", error);
    throw new Error("An error occurred while fetching the website");
  }
}

export async function sendCode(emailData) {
  const url = `${baseUrl}/auth/send-code`;

  console.log("email data in http is=====>", emailData);
  console.log("Fetching from:", url);

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;

    console.log("Response data:", response.data);
  } catch (error) {
    console.error("An error occurred while signing in", error);
    throw new Error("An error occurred while while signing in");
  }
}

export async function verifyCode(verifyCodeData) {
  const url = `${baseUrl}/auth/verify-code`;

  try {
    const response = await axios.post(url, verifyCodeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("An error occurred while signing in", error);
    throw new Error("An error occurred while while signing in");
  }
}

export async function addToFavourite(data) {
  const url = `${baseUrl}/favourite`;

  console.log("add to favoourite data in http is=====>", data);
  console.log("Fetching from:", url);

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("An error occurred while adding to favourite", error);
    throw new Error("An error occurred while adding to favourite");
  }
}

export async function fetchFavouriteWebsites(params) {
  const url = `${baseUrl}/favourite`;

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is missing from localStorage.");
    throw new Error("Authentication token is missing.");
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
      params,
    });

    return response?.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the websites", error);
    throw new Error("An error occurred while fetching the websites");
  }
}

export async function deleteFromFavourite({ id }) {
  const url = `${baseUrl}/favourite/${id}`;

  console.log("Fetching from:", url);

  const token = localStorage.getItem("token");

  console.log(token);

  if (!token) {
    console.error("Token is missing from localStorage.");
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("An error occurred while deleting favourites", error);
    throw new Error("An error occurred while  deleting favourites");
  }
}
