// src/hooks/useFetchCities.ts

import { useState, useEffect } from "react";
import { City } from "../domain/models/City";

const useFetchCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities");
        if (!response.ok) throw new Error("Failed to fetch cities.");
        const data = await response.json();
        setCities(data);
      } catch (err) {
        setError("Failed to fetch cities.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  return { cities, loading, error };
};

export default useFetchCities;
