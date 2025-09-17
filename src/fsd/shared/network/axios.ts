import axios from "axios";

export const $reqApi = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
  headers: {
    "Accept-Language": "ru",
    "Content-Type": "application/json",
    WithCredentials: "true",
  },
});
