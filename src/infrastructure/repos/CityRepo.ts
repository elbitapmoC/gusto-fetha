// src/infrastructure/repos/CityRepo.ts

import { cities } from "../../data/cities";
import { City } from "../../domain/models/City";
import { CityServiceInterface } from "../../domain/services/CityServiceInterface";

interface SearchOptions {
  limit?: number;
  offset?: number;
  searchTerm?: string;
}

class CityRepo implements CityServiceInterface {
  private collator = new Intl.Collator("en", { sensitivity: "base" });

  async getCities(
    limit?: number,
    offset?: number,
    searchTerm?: string
  ): Promise<City[]> {
    const options: SearchOptions = {
      limit: limit ?? 10000,
      offset: offset ?? 0,
      searchTerm: searchTerm ?? "",
    };
    const {
      limit: limitValue,
      offset: offsetValue,
      searchTerm: searchTermValue,
    } = options;

    // Handle special search term "error" to simulate an error
    if (
      searchTermValue &&
      this.collator.compare(searchTermValue, "error") === 0
    ) {
      throw new Error("Something terrible just happened!");
    }

    // Filter cities based on search term if provided
    const filteredList = searchTermValue
      ? cities.filter(
          (c) =>
            this.collator.compare(c[2], searchTermValue) === 0 || // City name
            this.collator.compare(c[3], searchTermValue) === 0 // Country name
        )
      : cities;

    // Paginate results and map to City objects
    return filteredList
      .slice(offsetValue ?? 0, (offsetValue ?? 0) + (limitValue ?? 10000))
      .map((row) => ({
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
