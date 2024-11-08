// src/application/useCases/GetCitiesUseCase.ts

import { City, CityServiceInterface } from "../types";

export class GetCitiesUseCase {
  constructor(private cityService: CityServiceInterface) {}

  async execute(limit = 10000, offset = 0, searchTerm = ""): Promise<City[]> {
    return await this.cityService.getCities(limit, offset, searchTerm);
  }
}
