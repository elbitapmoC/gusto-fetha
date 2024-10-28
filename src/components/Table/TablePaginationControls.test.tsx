// PaginationControls.test.tsx
import { render, screen } from "@testing-library/react";
import TablePaginationControls from "../../components/Table/TablePaginationControls";

test("disables previous button on first page", () => {
  render(
    <TablePaginationControls
      currentPage={1}
      totalPages={5}
      onPageChange={jest.fn()}
      isLoading={false}
    />
  );
  const prevButton = screen.getByLabelText("Previous Page");
  expect(prevButton).toBeDisabled();
});

test("disables next button on last page", () => {
  render(
    <TablePaginationControls
      currentPage={5}
      totalPages={5}
      onPageChange={jest.fn()}
      isLoading={false}
    />
  );
  const nextButton = screen.getByLabelText("Next Page");
  expect(nextButton).toBeDisabled();
});
