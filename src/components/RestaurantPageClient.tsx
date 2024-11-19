"use client"; // Indicating this is a Client Component

import React, { useState, useEffect } from "react";
import SearchBarWithFilters from "@/components/SearchBarWithFilters";
import RestaurantList from "@/components/RestaurantList";
import getSearchedRestaurants from "@/libs/getSearchedRestaurants";
import { RestaurantJson, RestaurantItem } from "../../interface";

const RestaurantPageClient = () => {
  const [restaurantsJson, setRestaurantsJson] = useState<RestaurantJson | null>(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    cuisine: "",
    province: "",
    sortOption: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await getSearchedRestaurants({ ...filters, page: currentPage });
        console.log(data, filters);
        setRestaurantsJson(data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurants();
  }, [filters, currentPage]);  // Trigger fetch on filters or currentPage change
  
  const handleFilterChange = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setCurrentPage(1); // Reset to first page whenever filters change
  };

  return (
    <main className="p-5">
      <h1 className="text-xl font-medium text-center mb-6">Red Gourmet Kitchen</h1>
      
      {/* Pass the result count to SearchBarWithFilters */}
      <SearchBarWithFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultsCount={restaurantsJson?.data?.length || 0} 
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        restaurantsJson?.data && <RestaurantList restaurantsJson={restaurantsJson.data} />
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default RestaurantPageClient;
