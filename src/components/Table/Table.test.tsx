import { render, screen } from "@testing-library/react";
import Table from "../../components/Table/Table";

const mockCities = [
  {
    id: 1,
    name: "New York",
    country: "USA",
    capital: "Admin",
    population: 8419000,
  },
  {
    id: 2,
    name: "London",
    country: "UK",
    population: 8982000,
    capital: "Secondary",
  },
];

test("renders table with correct data", () => {
  render(
    <Table
      cities={mockCities}
      onSort={jest.fn()}
      sortConfig={{ column: null, direction: "none" }}
    />
  );
  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("London")).toBeInTheDocument();
  expect(screen.getByText("8,419,000")).toBeInTheDocument();
  expect(screen.getByText("8,982,000")).toBeInTheDocument();
});
