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
  const [tempSearchQuery, setTempSearchQuery] = useState(filters.searchQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTempSearchQuery(value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleSearch = () => {
    onFilterChange({ ...filters, searchQuery: tempSearchQuery });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
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
          <div className="flex w-full px-4 py-3 items-center rounded-md border-2 border-[#EC0808] overflow-hidden relative">
            <div className="pr-2 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Something..."
              value={tempSearchQuery}
              name="searchQuery"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-white absolute right-2.5 bg-[#EC0808] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#EC0808] dark:hover:bg-red-700 dark:focus:ring-red-800"
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
              className="w-full px-4 py-2 rounded-md border-2 border-red-500"
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
              className="w-full px-4 py-2 rounded-md border-2 border-red-500"
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
              className="w-full px-4 py-2 rounded-md border-2 border-red-500"
            >
              <option key="name" value="name">
                name
              </option>
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
          <div className="flex w-full px-4 py-3 items-center rounded-md border-2 border-red-500 overflow-hidden relative">
            <input
              type="text"
              placeholder="Search Something..."
              value={tempSearchQuery}
              name="searchQuery"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-white absolute right-2.5 bg-[#EC0808] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-bg-[#EC0808] dark:hover:bg-red-700 dark:focus:ring-red-800"
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
            className="text-white bg-[#EC0808] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
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
                  className="w-full px-4 py-2 rounded-md border-2 border-red-500"
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
                  className="w-full px-4 py-2 rounded-md border-2 border-red-500"
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
                  className="w-full px-4 py-2 rounded-md border-2 border-red-500"
                >
                  <option key="name" value="name">name</option>
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
