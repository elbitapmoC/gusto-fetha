// src/presentation/hooks/useSearch.tsx

import { useState, useMemo } from "react";
import { City } from "../../app/domain/models/City";

const useSearch = (cities: City[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  return { searchTerm, setSearchTerm, filteredCities };
};

export default useSearch;
