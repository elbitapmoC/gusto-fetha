// src/application/services/CityServiceInterface.ts

import { City } from "../../app/domain/models/City";

export interface CityServiceInterface {
  getCities(
    limit?: number,
    offset?: number,
    searchTerm?: string
  ): Promise<City[]>;
}
