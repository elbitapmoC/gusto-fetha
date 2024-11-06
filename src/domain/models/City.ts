// src/domain/models/City.ts

export interface City {
  id: number;
  name: string;
  nameAscii?: string;
  country: string;
  countryIso3?: string;
  capital: string;
  population: number;
}
