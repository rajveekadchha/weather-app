import axios from "axios";
const API_KEY = "8ff6b1c427824112b02b9f92f1485bbb";

export const getWeatherData = (city, today_date, end_date) => {
  return axios.get("https://api.weatherbit.io/v2.0/history/energy", {
    params: {
      city: city,
      start_date: today_date,
      end_date: end_date,
      threshold: 63,
      units: "I",
      key: API_KEY,
      tp: "daily",
    },
  });
};
