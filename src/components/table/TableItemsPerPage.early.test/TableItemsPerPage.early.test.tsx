// Unit tests for: TableItemsPerPage

import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import TableItemsPerPage from "../TableItemsPerPage";
import "@testing-library/jest-dom";

// src/components/table/TableItemsPerPage.test.tsx
// src/components/table/TableItemsPerPage.test.tsx
describe("TableItemsPerPage() TableItemsPerPage method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should render the component with default items per page", () => {
      // Arrange
      const itemsPerPage = 20;
      const setItemsPerPage = jest.fn();

      // Act
      render(
        <TableItemsPerPage
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      );

      // Assert
      const selectElement = screen.getByLabelText("Items per page");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveValue(itemsPerPage.toString());
    });

    it("should call setItemsPerPage with the selected value when changed", () => {
      // Arrange
      const itemsPerPage = 20;
      const setItemsPerPage = jest.fn();

      // Act
      render(
        <TableItemsPerPage
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      );
      const selectElement = screen.getByLabelText("Items per page");
      fireEvent.change(selectElement, { target: { value: "30" } });

      // Assert
      expect(setItemsPerPage).toHaveBeenCalledWith(30);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle non-numeric input gracefully", () => {
      // Arrange
      const itemsPerPage = 20;
      const setItemsPerPage = jest.fn();

      // Act
      render(
        <TableItemsPerPage
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      );
      const selectElement = screen.getByLabelText("Items per page");
      fireEvent.change(selectElement, { target: { value: "abc" } });

      // Assert
      expect(setItemsPerPage).not.toHaveBeenCalled();
    });

    it("should not call setItemsPerPage if the same value is selected", () => {
      // Arrange
      const itemsPerPage = 20;
      const setItemsPerPage = jest.fn();

      // Act
      render(
        <TableItemsPerPage
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      );
      const selectElement = screen.getByLabelText("Items per page");
      fireEvent.change(selectElement, { target: { value: "20" } });

      // Assert
      expect(setItemsPerPage).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: TableItemsPerPage
