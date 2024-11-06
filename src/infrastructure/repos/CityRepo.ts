// src/infrastructure/repos/CityRepo.ts

import { cities } from "../../../public/worldcities/cities";
import { City } from "../../domain/models/City";
import { CityServiceInterface } from "../../domain/services/CityServiceInterface";

class CityRepo implements CityServiceInterface {
  private collator = new Intl.Collator("en", { sensitivity: "base" });

  async getCities(limit = 10000, offset = 0, searchTerm = ""): Promise<City[]> {
    // Handle special search term "error" to simulate an error
    if (searchTerm && this.collator.compare(searchTerm, "error") === 0) {
      throw new Error("Something terrible just happened!");
    }

    // Filter cities based on search term if provided
    const filteredList = searchTerm
      ? cities.filter(
          (c) =>
            this.collator.compare(c[2], searchTerm) === 0 || // City name
            this.collator.compare(c[3], searchTerm) === 0 // Country name
        )
      : cities;

    // Paginate results and map to City objects
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
