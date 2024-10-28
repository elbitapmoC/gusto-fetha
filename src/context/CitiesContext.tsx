import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getCities } from "../api/getCities";
import type { City } from "../api/getCities";

interface State {
  cities: City[];
  loading: boolean;
  error: string | null;
}

interface CitiesContextType extends State {
  fetchCities: () => Promise<void>;
}

const initialState: State = {
  cities: [],
  loading: false,
  error: null,
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: City[] }
  | { type: "FETCH_FAILURE"; payload: string };

function citiesReducer(state: State, action: Action): State {
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

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(citiesReducer, initialState);

  const fetchCities = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getCities();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: "Failed to load cities." });
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <CitiesContext.Provider value={{ ...state, fetchCities }}>
      {children}
    </CitiesContext.Provider>
  );
}
