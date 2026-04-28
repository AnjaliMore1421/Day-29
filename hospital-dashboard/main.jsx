import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Redux provider
import { Provider } from "react-redux";
import { store } from "./redux/store";

// global styles
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Entire app has access to Redux */}
    <App />
  </Provider>
);
