import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import dashboardBackground from "./assets/dashboardBackground.webp";
import Dashboard from "./components/Dashboard";
import appTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Box
          sx={{
            backgroundImage: `url(${dashboardBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Dashboard />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
