"use client";
// src/context/CitiesContext.tsx

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CityServiceInterface, City } from "../types";
import CityRepo from "../infrastructure/CityRepo";
import { GetCitiesUseCase } from "@/domain/GetCitiesUseCase";

// Define the state structure
interface State {
  cities: City[];
  loading: boolean;
  error: string | null;
  itemsPerPage: number; // Added itemsPerPage to the state
  setItemsPerPage: (items: number) => void; // Setter function for itemsPerPage
}

// Define initial state for cities
const initialState: Omit<State, "itemsPerPage" | "setItemsPerPage"> = {
  cities: [],
  loading: false,
  error: null,
};

// Define action types for reducer
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: City[] }
  | { type: "FETCH_FAILURE"; payload: string };

// Reducer function to handle state transitions
function citiesReducer(
  state: Omit<State, "itemsPerPage" | "setItemsPerPage">,
  action: Action
): Omit<State, "itemsPerPage" | "setItemsPerPage"> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, cities: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Create context with State type
const CitiesContext = createContext<State | undefined>(undefined);

// Custom hook to access CitiesContext with error handling
const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

// Provider component to supply context to children
const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(citiesReducer, initialState);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  useEffect(() => {
    const cityRepo = new CityRepo() as CityServiceInterface;
    const getCitiesUseCase = new GetCitiesUseCase(cityRepo);

    const fetchCities = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const cities = await getCitiesUseCase.execute();
        dispatch({ type: "FETCH_SUCCESS", payload: cities });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: "Failed to load cities." });
      }
    };

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        ...state,
        itemsPerPage, // Include itemsPerPage in the context
        setItemsPerPage, // Provide setter function to update itemsPerPage
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider, useCities };
