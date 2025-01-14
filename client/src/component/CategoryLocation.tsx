import { useContext } from "react";
import { Link } from "react-router-dom";
import { CitiesCT } from "../context/cityCT";
import { City } from "../interface/hotel";

const CategoryLocation = () => {
  const { cities } = useContext(CitiesCT);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 p-4 mb-8 border border-gray-300 rounded-lg">
        {cities && cities.length > 0 ? (
          cities.map((city: City) => (
            <div
              key={city.id}
              className="relative group shadow-lg transition-shadow duration-300 hover:shadow-2xl aspect-[2/1]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(http://localhost:8000/storage/${city.image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Link
                to={`/CategoryCity/${city.id}`} // Navigate to the category page with the city ID
                className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold transition-transform duration-300 group-hover:scale-110"
              >
                {city.name}
              </Link>
            </div>
          ))
        ) : (
          <div className="py-4 px-6 text-center text-sm font-medium text-gray-900 dark:text-white">
            Không có dữ liệu
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLocation;
