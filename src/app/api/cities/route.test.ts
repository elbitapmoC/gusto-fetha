// Unit tests for: GET
// src/app/api/cities/route.test.ts

import { NextResponse } from "next/server";
import { cities } from "../../../data/cities";
import { GET } from "./route";

import { jest } from "@jest/globals";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("GET() GET method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should return a JSON response with the list of cities", async () => {
      // Arrange
      const expectedResponse = cities;

      // Act
      await GET();

      // Assert
      expect(NextResponse.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("Edge Cases", () => {
    it("should handle the case when cities data is empty", async () => {
      // Arrange
      const originalCities = [...cities];
      cities.length = 0; // Temporarily empty the cities array

      // Act
      await GET();

      // Assert
      expect(NextResponse.json).toHaveBeenCalledWith([]);

      // Cleanup
      cities.push(...originalCities); // Restore the original cities array
    });

    it("should handle the case when cities data is undefined", async () => {
      // Arrange
      const originalCities = [...cities];
      (cities as any) = undefined; // Temporarily set cities to undefined

      // Act
      await GET();

      // Assert
      expect(NextResponse.json).toHaveBeenCalledWith(undefined);

      // Cleanup
      (cities as any) = originalCities; // Restore the original cities array
    });
  });
});

// End of unit tests for: GET
