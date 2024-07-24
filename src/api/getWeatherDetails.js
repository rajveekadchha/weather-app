import axios from "axios";
const API_KEY = "94c685d967b1435e809178941442ca0f";

// export const getWeatherData = (city, today_date, end_date) => {
//   return axios.get("https://api.weatherbit.io/v2.0/history/energy", {
//     params: {
//       city: city,
//       start_date: today_date,
//       end_date: end_date,
//       threshold: 63,
//       units: "I",
//       key: API_KEY,
//       tp: "daily",
//     },
//   });
// };

export const getWeatherData = (city, today_date, end_date) => {
  return axios.get("https://api.weatherbit.io/v2.0/current", {
    params: {
      city: city,
      // start_date: today_date,
      // end_date: end_date,
      // threshold: 63,
      units: "I",
      key: API_KEY,
      include: "minutely",
    },
  });
};
