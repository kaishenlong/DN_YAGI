import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CitiesContext from "./context/cityCT.tsx";
import RoomContext from "./context/roomCT.tsx";
import HotelProvider from "./context/hotel.tsx";
import ReviewContext from "./context/review.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CitiesContext>
        <HotelProvider>
          <RoomContext>
            <ReviewContext>
              <App />
            </ReviewContext>
          </RoomContext>
        </HotelProvider>
      </CitiesContext>
    </BrowserRouter>
  </React.StrictMode>
);
