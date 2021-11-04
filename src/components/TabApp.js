import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Home from "./Home";
import TodoList from "./TodoList";
import About from "./About";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

function TabApp() {
  const [value, setValue] = useState("home");

  const handleChange = (event, value) => {
    setValue(value);
  };

  const theme = createTheme({
    palette: {
      appbar: {
        backcolor: "#F4F1DE",
        textdark: "#E07A5F",
        textlight: "#3D405B",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ bgcolor: "appbar.backcolor" }}>
          <Tabs value={value} centered={true} onChange={handleChange}>
            <Tab
              sx={{ color: "appbar.textdark" }}
              value="home"
              label="Home"
              icon={<HomeIcon />}
            />
            <Tab
              sx={{ color: "appbar.textdark" }}
              value="todo"
              label="App"
              icon={<ListIcon />}
            />
            <Tab
              sx={{ color: "appbar.textdark" }}
              value="about"
              label="About"
              icon={<InfoIcon />}
            />
          </Tabs>
        </AppBar>
      </ThemeProvider>
      {value === "home" && <Home />}
      {value === "todo" && <TodoList />}
      {value === "about" && <About />}
    </div>
  );
}

export default TabApp;
