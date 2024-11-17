import React from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-400 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
            Hello, Admin!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
            Welcome to your dashboard
          </p>
          <div className="flex justify-center">
            <Link
              to={"/dashboard/list"}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
