import axios from "axios";

const baseURL = "https://api.unsplash.com/search";

const axiosInstance = axios.create({
  baseURL,
});

export const fetchImages = async () => {
  const res = await axiosInstance.get("/photos", {
    params: {
      per_page: 20,
      query: "office",
    },
    headers: {
      Authorization: "Client-ID qvy2y7fRCE_mIZrDJ8fevnKO8Mm29ZYhiXQSRq70mOw",
    },
  });
  return res.data;
};
