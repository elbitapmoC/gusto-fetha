// src/infrastructure/repos/CityRepo.ts

import { cities } from "data/worldcities/cities";
import { City } from "../../domain/models/City";
import { CityServiceInterface } from "../../application/services/CityServiceInterface";

type SearchOptions = Partial<{
  limit: number;
  offset: number;
  searchTerm: string;
}>;

class CityRepo implements CityServiceInterface {
  private collator = new Intl.Collator("en", { sensitivity: "base" });

  async getCities({
    limit = 10000,
    offset = 0,
    searchTerm,
  }: SearchOptions = {}): Promise<City[]> {
    let filteredList;

    // Error handling for specific search term "error"
    if (searchTerm && this.collator.compare(searchTerm, "error") === 0) {
      throw new Error("Something terrible just happened!");
    }

    // Filtering cities based on search term
    if (!searchTerm) {
      filteredList = cities;
    } else {
      filteredList = cities.filter(
        (c) =>
          this.collator.compare(c[2], searchTerm) === 0 || // City name
          this.collator.compare(c[3], searchTerm) === 0 // Country name
      );
    }

    // Slicing and mapping to City type
    return filteredList.slice(offset, offset + limit).map((row) => ({
      id: row[0],
      name: row[1],
      nameAscii: row[2],
      country: row[3],
      countryIso3: row[4],
      capital: row[5],
      population: row[6],
    }));
  }
}

export default CityRepo;
