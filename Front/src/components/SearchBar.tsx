import React, { useState } from "react";
import { Search } from "lucide-react";
// import { services } from '@/data/services';

const SearchBar: React.FC<{ onFilterChange: (category: string) => void }> = ({
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState<number | string>("");
  const [rating, setRating] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    console.log("Searching with filters:", {
      searchTerm,
      serviceType,
      location,
      city,
      priceRange,
      rating,
    });
  };

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceType(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search input with logo inside */}
      <div className="relative flex items-center w-full">
        {/* Search input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={window.innerWidth < 768 ? "Service.." : "Search for service..."}
          className="search-input border border-gray-300 px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
          style={{ fontSize: "0.875rem" }}
        />

        {/* Filter label */}
        <span
          className="text-gray-700 text-sm absolute right-12 cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </span>

        {/* Search icon */}
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {/* Filter dropdown - appears below the search bar */}
      {isFilterOpen && (
        <div className="filter-container flex space-x-2 bg-white p-2 rounded-md shadow-lg absolute mt-2 z-10  text-sm">
          <select
            value={serviceType}
            onChange={handleServiceTypeChange}
            className="filter-select border border-gray-300 px-2 py-1 rounded-md text-xs"
          >
            <option value="All">All Services</option>
            {/* {services.map(service => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))} */}
          </select>

          {/* Location dropdown */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="filter-select border border-gray-300 px-2 py-1 rounded-md text-xs"
          >
            <option value="">Location</option>
            <option value="city">City</option>
            <option value="zip-code">Zip Code</option>
          </select>

          {/* City input with dynamic placeholder */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={location === "city" ? "Enter City" : "Enter Zip Code"} // Dynamic placeholder text
            className="filter-input w-[120px] border border-gray-300 px-2 py-1 rounded-md text-xs"
          />

          {/* Smaller Max Price input */}
          <input
            type="number"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="Max Price"
            className="filter-input border border-gray-300 px-2 py-1 rounded-md text-xs w-20"
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="filter-select border border-gray-300 px-2 py-1 rounded-md text-xs"
          >
            <option value="">Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <button
            onClick={handleSearch}
            className="search-button bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
