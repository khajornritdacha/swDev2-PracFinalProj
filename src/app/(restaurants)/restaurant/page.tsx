

import React from "react";
import RestaurantPageClient from "../../../components/RestaurantPageClient"; // Import the Client Component
import AdminBar from "@/components/AdminBar";

const RestaurantPage = () => {
  return (
    <><AdminBar />
  <RestaurantPageClient />
  </>);
};

export default RestaurantPage;
