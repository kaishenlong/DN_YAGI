import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CitiesContext from "./context/cityCT.tsx";
import HotelContext from "./context/hotel.tsx";
import RoomContext from "./context/roomCT.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CitiesContext>
        <HotelContext>
          <RoomContext>
            <App />
          </RoomContext>
        </HotelContext>
      </CitiesContext>
    </BrowserRouter>
  </React.StrictMode>
);
