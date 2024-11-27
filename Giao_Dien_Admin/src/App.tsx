import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";

// import CategoryContext from "./context/category";
import Admin from "./layout/admin";
import HomeAdmin from "./admin/homeadmin";
// import Addproduct from "./admin/addProduct";
// import Editproduct from "./admin/editProduct";
// import CategoryList from "./admin/categorylist";
// import AddCategory from "./admin/addCategory";
// import EditCategory from "./admin/EditCategory";
// import Quanlytaikhoan from "./admin/Quanlytaikhoan";
// import Reviews from "./admin/reviews";
// import Bookings from "./admin/booKings";
// import Productlist from "./admin/productlist";
// import Dashboard from "./admin/dashboard";
import Hotellist from "./admin/Hotels/Hotelslist";
import AddHotels from "./admin/Hotels/addHotel";
import HotelContext from "./context/hotel";
import CitiesContext from "./context/cities";
import CitiesList from "./admin/cities/citiesList";
import AddCities from "./admin/cities/addCities";
import EditHotels from "./admin/Hotels/editHotel";
import TypeRoomList from "./admin/typeRooms/typeRoomsList";
import AddTypeRoom from "./admin/typeRooms/addTypeR";
import TypeRoomContext from "./context/typeRoom";
import Roomlist from "./admin/Rooms/roomsList";
import RoomContext from "./context/room";
import AddRooms from "./admin/Rooms/addRoom";
import EditRooms from "./admin/Rooms/EditRoom";
function App() {
  const Route = useRoutes([
    {
      path: "dashboard",
      element: (
        <HotelContext>
          <CitiesContext>
            <TypeRoomContext>
              <RoomContext>
                <Admin />
              </RoomContext>
            </TypeRoomContext>
          </CitiesContext>
        </HotelContext>
      ),
      children: [
        { path: "hotels", element: <Hotellist /> },
        { path: "hotels/add", element: <AddHotels /> },
        { path: "hotels/editHotel/:id", element: <EditHotels /> },
        { path: "", element: <HomeAdmin /> },
        { path: "cities", element: <CitiesList /> },
        { path: "cities/add", element: <AddCities /> },
        { path: "rooms", element: <Roomlist /> },
        { path: "rooms/addRoom", element: <AddRooms /> },
        { path: "rooms/editRoom/:id", element: <EditRooms /> },
        { path: "rooms/typeroom", element: <TypeRoomList /> },
        { path: "rooms/typeroom/addtype", element: <AddTypeRoom /> },
        // { path: "taikhoan", element: <Quanlytaikhoan /> },
        // { path: "reviews", element: <Reviews /> },
        // { path: "bookings", element: <Bookings /> },
        // { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ]);
  return Route;
}

export default App;
