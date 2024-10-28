// Search.test.tsx
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { CitiesProvider } from "../../context/CitiesContext";

jest.mock("../../hooks/useSearch", () => ({
  __esModule: true,
  default: () => ({
    searchTerm: "",
    handleInputChange: jest.fn(),
    filteredItems: [],
  }),
}));

test("renders search input", () => {
  render(
    <CitiesProvider>
      <Search />
    </CitiesProvider>
  );
  const searchInput = screen.getByLabelText("Search field");
  expect(searchInput).toBeInTheDocument();
});

test("displays loading state", () => {
  render(
    <CitiesProvider>
      <Search />
    </CitiesProvider>
  );
  const loadingElement = screen.getByText("Loading cities...");
  expect(loadingElement).toBeInTheDocument();
});
