import { useState, useEffect, ChangeEvent } from "react";
import type { City } from "../api/getCities";

const useSearch = (cities: City[] = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredItems, setFilteredItems] = useState<City[]>(cities);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 150);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const term = debouncedSearchTerm.toLowerCase();

    // Handle cases where cities might be undefined or null
    const filtered = cities
      .filter((city) => city && city.name && city.country) // Ensure city is valid
      .filter(
        (city) =>
          city.name.toLowerCase().includes(term) ||
          city.country.toLowerCase().includes(term) ||
          (city.capital && city.capital.toLowerCase().includes(term))
      );

    setFilteredItems(filtered);
  }, [debouncedSearchTerm, cities]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { searchTerm, handleInputChange, filteredItems };
};

export default useSearch;
