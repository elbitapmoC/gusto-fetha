import { render, screen, fireEvent } from "@testing-library/react";
import TableItemsPerPage from "../../components/Table/TableItemsPerPage";

test("renders correct options", () => {
  const options = [10, 25, 50];
  render(
    <TableItemsPerPage value={10} onChange={jest.fn()} options={options} />
  );
  options.forEach((option) => {
    expect(screen.getByText(option.toString())).toBeInTheDocument();
  });
});

test("calls onChange when selection changes", () => {
  const onChange = jest.fn();
  render(
    <TableItemsPerPage value={10} onChange={onChange} options={[10, 25, 50]} />
  );
  fireEvent.change(screen.getByLabelText("Items per page:"), {
    target: { value: "25" },
  });
  expect(onChange).toHaveBeenCalled();
});
