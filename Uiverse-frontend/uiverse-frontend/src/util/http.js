import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

const baseUrl = "http://localhost:9000/api";

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

