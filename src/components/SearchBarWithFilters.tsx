"use client";
import { cuisineOptions, provinceOptions, sortOptions } from "@/utils/options";
import { useState, useEffect, useRef } from "react";

interface SearchBarWithFiltersProps {
  filters: {
    searchQuery: string;
    cuisine: string;
    province: string;
    sortOption: string;
  };
  onFilterChange: (newFilters: any) => void;
  resultsCount: number;
}
const SearchBarWithFilters: React.FC<SearchBarWithFiltersProps> = ({
  filters,
  onFilterChange,
  resultsCount,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleSearch = () => {
    // You can add the logic to trigger the search with the filters here.
    console.log(filters);
    onFilterChange(filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
      setIsMobileFilterOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect click outside of the filter panel
    const handleOutsideClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this runs once on mount and clean up on unmount

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block space-y-4">
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex w-full px-4 py-3 items-center rounded-md border-2 border-blue-500 overflow-hidden max-w-md relative">
            <input
              type="text"
              placeholder="Search Something..."
              value={filters.searchQuery}
              name="searchQuery"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-white absolute right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>

          {/* Cuisine Dropdown */}
          <div className="w-1/4">
            <label className="block text-sm text-gray-600">Cuisine</label>
            <select
              name="cuisine"
              value={filters.cuisine}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
            >
              <option value="">All Cuisines</option>
              {cuisineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Province Dropdown */}
          <div className="w-1/4">
            <label className="block text-sm text-gray-600">Province</label>
            <select
              name="province"
              value={filters.province}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
            >
              <option value="">All Provinces</option>
              {provinceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Number of Results: {resultsCount}</span>

          {/* Sort Option Dropdown */}
          <div className="w-1/4">
            <label className="block text-sm text-gray-600">Sort by</label>
            <select
              name="sortOption"
              value={filters.sortOption}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
            >
              <option value="">Sort by Name</option>
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex w-full px-4 py-3 items-center rounded-md border-2 border-blue-500 overflow-hidden max-w-md relative">
            <input
              type="text"
              placeholder="Search Something..."
              value={filters.searchQuery}
              name="searchQuery"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-white absolute right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results Count and Filter Button */}
        <div className="flex justify-between items-center">
          <span className="text-sm">Number of Results: {resultsCount}</span>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Filter
          </button>
        </div>

        {isMobileFilterOpen && (
          <div
            ref={filterRef}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md">
              <div>
                <label className="block text-sm text-gray-600">Cuisine</label>
                <select
                  name="cuisine"
                  value={filters.cuisine}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
                >
                  <option value="">All Cuisines</option>
                  {cuisineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Province</label>
                <select
                  name="province"
                  value={filters.province}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
                >
                  <option value="">All Provinces</option>
                  {provinceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Sort by</label>
                <select
                  name="sortOption"
                  value={filters.sortOption}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-2 rounded-md border-2 border-blue-500"
                >
                  <option value="">Sort by Name</option>
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBarWithFilters;
