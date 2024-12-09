import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCities } from "../component/api/city";
import { City } from "../type/ICity";

type Props = {};

const CategoryLocation = (props: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 p-4 mb-8 border border-gray-300 rounded-lg">
        {Array.isArray(cities) && cities.length > 0 ? (
          cities.slice(0, 15).map((city) => ( // Giới hạn số lượng thành phố là 15
            <div
              key={city.id}
              className="relative group shadow-lg transition-shadow duration-300 hover:shadow-2xl aspect-[2/1]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${city.image || "src/upload/default.png"})` }}
              ></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Link
                to={`/Category/${city.id}`}
                className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold transition-transform duration-300 group-hover:scale-110"
              >
                {city.name}
              </Link>
            </div>
          ))
        ) : (
          <div>No cities available</div>
        )}
      </div>
    </div>
  );
};

export default CategoryLocation;
