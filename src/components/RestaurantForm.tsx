"use client";

import React, { useState, useEffect } from "react";
import InputQuestion from "../components/InputQuestionProps";
import SelectQuestion from "../components/SelectQuestionProps";
import RestaurantIcon from "../../public/logo/restaurant.svg";
import PinIcon from "../../public/logo/pin.svg";

// Import the options from the external file
import { provinceOptions, cuisineOptions } from "../utils/options";
import axiosInstance from "@/libs/axios";
import { RestaurantDto } from "@/interface";

interface RestaurantFormProps {
  onSubmit: (restaurantData: Omit<RestaurantDto, "_id">) => void;
  initialData?: RestaurantDto; // For edit mode
  token: string;
  rid?: string;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  onSubmit,
  initialData,
  token,
  rid,
}) => {
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [foodtype, setFoodtype] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      // Pre-fill form with the data when editing
      setName(initialData.name);
      setTel(initialData.tel);
      setPostalCode(initialData.postalcode);
      setAddress(initialData.address);
      setProvince(initialData.province);
      setFoodtype(initialData.foodtype);
      setPicture(initialData.picture);
    }
  }, [initialData]);

  const validateTel = (value: string) => /^\d{10}$/.test(value); // Validates phone number to be exactly 10 digits
  const validatePostalCode = (value: string) => /^\d{5}$/.test(value); // Validates postal code to be exactly 5 digits

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    const restaurantData = {
      name,
      tel,
      address,
      postalcode: postalCode,
      province,
      foodtype,
      picture,
    };

    try {
      const method = initialData ? "PUT" : "POST"; // Use PUT for editing, POST for creating
      const url =
        method === "PUT" && rid ? `restaurants/${rid}` : `restaurants`;
      await axiosInstance.request({
        url: url,
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(restaurantData),
      });

      onSubmit(restaurantData); // Call the onSubmit prop with the new data
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-2 justify-center"
    >
      {/* Inline Selects for Cuisine and Province */}
      <div className="flex gap-2">
        <SelectQuestion
          label="Cuisine"
          id="cuisine"
          options={cuisineOptions}
          selectedValue={foodtype}
          onChange={(e) => setFoodtype(e.target.value)}
          svgPath={RestaurantIcon}
          placeholder="Cuisine"
        />
        <SelectQuestion
          label="Province"
          id="province"
          options={provinceOptions}
          selectedValue={province}
          onChange={(e) => setProvince(e.target.value)}
          svgPath={PinIcon}
          placeholder="Province"
        />
      </div>

      {/* Slim, styled horizontal rule */}
      <hr className="border-t border-gray-400 opacity-20 mb-4 mx-4" />

      {/* Name Field */}
      <InputQuestion
        label="Full Name"
        id="full-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Restaurant Name"
      />

      <InputQuestion
        label="Address"
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Restaurant Address"
      />

      {/* Postal Code Field */}
      <InputQuestion
        label="Postal Code"
        id="postal-code"
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Enter postal code"
        validate={validatePostalCode}
      />

      {/* Tel Field */}
      <InputQuestion
        label="Phone Number"
        id="tel"
        type="text"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        placeholder="Enter phone number"
        validate={validateTel}
      />

      {/* Picture Field */}
      <InputQuestion
        label="Picture Link"
        id="picture"
        type="text"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        placeholder="Picture link"
      />

      {/* Submit Button */}
      <div className="flex items-center mb-6 justify-center">
        <div className="w-[2/3]">
          <button
            className="shadow bg-[#EC0808] hover:bg-red-400 px-8 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-[50px]"
            type="submit"
          >
            {initialData ? "Update Restaurant" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RestaurantForm;
