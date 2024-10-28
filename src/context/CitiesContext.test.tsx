/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CitiesProvider, useCities } from "./CitiesContext";
import { getCities } from "../api/getCities";

jest.mock("../api/getCities");

const TestComponent = () => {
  const { cities, loading, error } = useCities();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{cities.length} cities loaded</div>;
};

describe("CitiesProvider", () => {
  it("provides cities data to components", async () => {
    (getCities as jest.Mock).mockResolvedValue([{ id: 1, name: "Test City" }]);

    await act(async () => {
      render(
        <CitiesProvider>
          <TestComponent />
        </CitiesProvider>
      );
    });

    expect(screen.getByText("1 cities loaded")).toBeInTheDocument();
  });

  it("handles fetch error", async () => {
    (getCities as jest.Mock).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(
        <CitiesProvider>
          <TestComponent />
        </CitiesProvider>
      );
    });

    expect(
      screen.getByText("Error: Failed to load cities.")
    ).toBeInTheDocument();
  });
});
