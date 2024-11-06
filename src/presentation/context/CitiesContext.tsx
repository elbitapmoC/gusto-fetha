// src/presentation/context/CitiesContext.tsx

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { City } from "../../domain/models/City";
import CityRepo from "../../infrastructure/repos/CityRepo";
import { GetCitiesUseCase } from "../../application/useCases/GetCitiesUseCase";

interface State {
  cities: City[];
  loading: boolean;
  error: string | null;
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

const CitiesContext = createContext<State | undefined>(undefined);

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(citiesReducer, initialState);

  const cityRepo = new CityRepo();
  const getCitiesUseCase = new GetCitiesUseCase(cityRepo);

  useEffect(() => {
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
  }, [getCitiesUseCase]);

  return (
    <CitiesContext.Provider value={state}>{children}</CitiesContext.Provider>
  );
};
