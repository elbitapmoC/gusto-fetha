// src/application/services/CityServiceInterface.ts

import { City } from "../../domain/models/City";

export interface CityServiceInterface {
  getCities(
    limit?: number,
    offset?: number,
    searchTerm?: string
  ): Promise<City[]>;
}
