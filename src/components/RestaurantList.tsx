import React from "react";
import { RestaurantItem } from "../../interface";
import RestaurantCard from "./RestaurantCard"; // Assuming you have a Card component

// Define the props interface
interface RestaurantListProps {
  restaurantsJson: RestaurantItem[]; // An array of RestaurantItem
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurantsJson }) => {
  if (!restaurantsJson || restaurantsJson.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 py-4 px-[5%] justify-center items-center">
      {restaurantsJson.map((restaurantItem: RestaurantItem) => (
        <RestaurantCard key={restaurantItem._id} restaurant={restaurantItem} />
      ))}
    </div>
  );
};

export default RestaurantList;
