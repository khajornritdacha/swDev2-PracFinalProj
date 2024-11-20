"use client";
import React, { useState } from "react";
import RestaurantForm from "../../../../components/RestaurantForm";
import RestaurantDetail from "@/components/RestaurantDetail";
import { useSession } from "next-auth/react";

export default function RestaurantCreatePage() {
  const session = useSession();
  const [restaurant, setRestaurant] = useState({
    name: "Name",
    foodtype: "Cuisine",
    address: "Restaurant Address",
    province: "Province",
    postalcode: "00000",
    tel: "0000000000",
    picture:
      "https://instyledecoparis.com/wp-content/uploads/2022/08/Restaurant-Interior-Design-Pizzaria-inside-with-Bar-view-1.jpg",
  });

  // Function to handle form submission and update restaurant data
  const handleFormSubmit = (newRestaurantData: typeof restaurant) => {
    setRestaurant(newRestaurantData);
  };

  return (
    <>
      <div className="h-full w-full flex flex-wrap justify-center">
        <div className="flex flex-col justify-start items-center">
          <div className="w-[80%] h-auto border-b-4 border-[#EC0808] flex items-center justify-center">
            <div className="h-auto text-[36px] font-semibold text-black">
              Create
            </div>
          </div>
          <RestaurantForm
            onSubmit={handleFormSubmit}
            token={session.data?.user.token || ""}
          />{" "}
          {/* Pass handleFormSubmit as prop */}
        </div>
        <div className="gap-8 py-4 items-center flex flex-col">
          <div className="h-auto text-[20px] font-extrabold text-[#999999]">
            Detail Page Example
          </div>
          <RestaurantDetail restaurant={restaurant} hideBookingButton={true} />{" "}
          {/* Pass restaurant data as prop */}
        </div>
      </div>
    </>
  );
}
