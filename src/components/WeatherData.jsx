import dayjs from "dayjs";
import { Card, CardContent, Fab, Box, Grid, Typography } from "@mui/material";
import weatherResultBackground from "../assets/weatherResultBackground.webp";

import { MdLocationPin } from "react-icons/md";
import { LuCloudRainWind } from "react-icons/lu";
import { LuCloudSun } from "react-icons/lu";
import { LuCloudRain } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getWeatherData } from "../api/getWeatherDetails";
import appTheme from "../theme";
import Dashboard from "./Dashboard";
import styles from "./WeatherData.module.css";

export default function WeatherData({ city }) {
  const isLargeScreen = useMediaQuery(appTheme.breakpoints.up("lg"));
  // Flags
  const [Wdata, setWData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [backFlag, setBackFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [error, setError] = useState("");

  // Date Variables
  const date = new Date();
  const start_date = dayjs(date).subtract(7, "day").format("YYYY-MM-DD");
  const today_date = dayjs(date).format("YYYY-MM-DD");
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = dayNames[date.getDay()];
  const index = dayNames.indexOf(dayOfWeek);

  // Rearranging Days
  const reorderedDayNames = dayNames
    .slice(index)
    .concat(dayNames.slice(0, index));

  useEffect(() => {
    getWeatherData(city, start_date, today_date)
      .then((response) => {
        setWData(response.data);
        if (!response.data.city_name) {
          setErrorFlag(true);
          setError("wrong city");
        } else {
          setErrorFlag(false);
        }
        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {errorFlag || backFlag ? (
        <Dashboard msg={error} />
      ) : (
        <>
          <div
            style={{
              padding: "5%",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <Card
              sx={{
                height: { sm: "90vh", md: "85vh" },
                width: "100%",
              }}
              style={{
                backdropFilter: "blur(30px)",
                background: "transparent",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: { sm: "70%", xs: "30%", md: "70%" },
                  width: "100%",
                }}
                alt="background"
                src={weatherResultBackground}
              />
              <Typography
                variant={isLargeScreen ? "h2" : "h6"}
                sx={{
                  color: "aliceblue",
                  position: "absolute",
                  top: { xs: "5%", md: "5%", lg: "5%" },
                  left: { xs: "2%", md: "5%", lg: "3%" },
                }}
              >
                <Fab
                  color="black"
                  size="small"
                  sx={{ marginRight: 5 }}
                  onClick={() => setBackFlag(true)}
                >
                  <IoIosArrowBack />
                </Fab>
                {Wdata?.city_name},{Wdata?.country_code}
              </Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "absolute",
                  top: "5%",
                  right: "3%",
                }}
              >
                <MdLocationPin
                  style={{
                    fontSize: isLargeScreen ? "85px" : "40px",
                    margin: "auto -20px",
                    color: "aliceblue",
                    display: { xs: "none", md: "unset" },
                  }}
                />

                <Typography
                  variant={isLargeScreen ? "h5" : ""}
                  sx={{
                    color: "aliceblue",
                    display: { xs: "none", md: "unset" },
                  }}
                >
                  {Wdata?.city_name},{Wdata?.country_code}
                </Typography>
                <Typography
                  variant={isLargeScreen ? "h5" : "h6"}
                  sx={{
                    color: "aliceblue",
                    top: { md: "17%" },
                    right: { md: "36%" },
                  }}
                >
                  {strTime}
                </Typography>
              </div>

              <CardContent
                sx={{ height: "100%" }}
                style={{
                  backdropFilter: "blur(30px)",
                  background: "#ffffff0f",
                }}
              >
                <Grid container spacing={2} sx={{ color: "white" }}>
                  <Grid
                    item
                    xs={6}
                    sm={1.5}
                    sx={{
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 2,
                    }}
                  >
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h2" : "h4"}>
                        {Wdata?.data[6]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Fab
                      disabled
                      variant="extended"
                      sx={{
                        background: "#0000004a",
                        color: "white !important",
                      }}
                    >
                      {reorderedDayNames[0].substring(0, 3)}
                      {today_date.split("-")[2]}
                      <Typography variant="overline" gutterBottom>
                        th
                      </Typography>
                    </Fab>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={1.5}
                    sx={{
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <LuCloudRainWind
                        style={{
                          fontSize: isLargeScreen ? "85px" : "40px",
                        }}
                      />
                      {flag ? (
                        <Typography>
                          {Wdata?.data[6]?.max_wind_spd} kmph /
                          {Wdata?.data[6]?.temp_wetbulb} &deg;F
                        </Typography>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: { sm: "1px solid #0000002b" },
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      borderRight: { xs: "1px solid #0000002b" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[1].substring(0, 3)}
                    </Fab>
                    <LuCloudSun style={{ fontSize: "-webkit-xxx-large" }} />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[0]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: { sm: "1px solid #0000002b" },
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      borderRight: { xs: "1px solid #0000002b" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[2].substring(0, 3)}
                    </Fab>
                    <LuCloudSun style={{ fontSize: "-webkit-xxx-large" }} />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[1]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: { sm: "1px solid #0000002b" },
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[3].substring(0, 3)}
                    </Fab>
                    <LuCloudRain style={{ fontSize: "-webkit-xxx-large" }} />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[2]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: { sm: "1px solid #0000002b" },
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      borderRight: { xs: "1px solid #0000002b" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[4].substring(0, 3)}
                    </Fab>
                    <LuCloudRain
                      style={{
                        fontSize: "-webkit-xxx-large",
                      }}
                    />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[3]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: { sm: "1px solid #0000002b" },
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                      borderRight: { xs: "1px solid #0000002b" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[5].substring(0, 3)}
                    </Fab>
                    <LuCloudRainWind
                      style={{
                        fontSize: "-webkit-xxx-large",
                      }}
                    />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[4]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={1.5}
                    sx={{
                      borderLeft: "1px solid #0000002b",
                      borderBottom: { xs: "1px solid #0000002b", sm: "0px" },
                    }}
                  >
                    <Fab
                      disabled
                      variant="extended"
                      className={
                        isLargeScreen ? styles.dateStyle : styles.dateStyleSmall
                      }
                    >
                      {reorderedDayNames[6].substring(0, 3)}
                    </Fab>
                    <LuCloudRainWind
                      style={{
                        fontSize: "-webkit-xxx-large",
                      }}
                    />
                    {flag ? (
                      <Typography variant={isLargeScreen ? "h4" : "h6"}>
                        {Wdata?.data[5]?.temp}&deg;
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
