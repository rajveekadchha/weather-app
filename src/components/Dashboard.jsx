import {
  Button,
  TextField,
  Typography,
  Grid,
  useMediaQuery,
  Alert,
} from "@mui/material";
import appTheme from "../theme";
import { useState } from "react";
import WeatherData from "./WeatherData";

export default function Dashboard({ msg }) {
  const isSmallScreen = useMediaQuery(appTheme.breakpoints.down("sm"));

  const [guessCity, setGuessCity] = useState("");
  const [city, setCity] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);

  function searchCity(e) {
    setGuessCity(e.target.value);
  }

  function setCityName() {
    if (guessCity) {
      setCity(guessCity);
      setSearchFlag(true);
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      setCityName();
    }
  }

  return (
    <>
      {searchFlag ? (
        <WeatherData city={city} />
      ) : (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          direction="column"
          height="100vh"
        >
          <Typography
            variant={isSmallScreen ? "h4" : "h2"}
            sx={{
              p: 6,
              fontFamily: "Red Hat Display ",
              fontWeight: 800,
              color: "black",
            }}
          >
            Weather Forecast
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <TextField
              id={isSmallScreen ? "outlined-basic" : "fullWidth"}
              label={"Enter a city"}
              value={guessCity}
              onChange={searchCity}
              onKeyDown={handleEnterKey}
              color="secondary"
              sx={{
                m: 3,
                bgcolor: "white",
                opacity: 0.6,
                width: "60%",
                "&:hover": {
                  bgcolor: "white",
                  backdropFilter: "blur(10px)",
                },
              }}
              variant="filled"
            />
            <Button
              onClick={setCityName}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  background: "#ffffff2e",
                  backdropFilter: "blur(10px)",
                  borderColor: "white",
                },
              }}
              variant="outlined"
              disableRipple
            >
              Get Weather
            </Button>
          </Grid>
          {msg ? (
            <Alert severity="error" sx={{ m: 3 }}>
              {msg}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      )}
    </>
  );
}
