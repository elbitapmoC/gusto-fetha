import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Footer from "./components/Footer";
import { CitiesProvider } from "./context/CitiesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CitiesProvider>
      <main
        className="antialiased p-4 sm:p-8"
        style={{ color: "var(--text-color)" }}
      >
        <App />
        <Footer />
      </main>
    </CitiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
