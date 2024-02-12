import { Provider } from "react-redux";
import { store } from "src/store";
import { ThemeProvider } from "@mui/material";
import theme from "src/theme/theme";
import "src/utils/i18n";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
