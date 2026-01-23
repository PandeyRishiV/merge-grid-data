import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Row } from "../../src/App";
import Grid from "../../src/components/Grid.tsx";

function makeRow(): Row {
  return {
    id: "row1",
    name: "Product A",
    values: {
      Jan: 10,
      Feb: 20,
      Mar: 30,
      Apr: 40,
      May: 50,
      Jun: 60,
      Jul: 70,
      Aug: 80,
      Sep: 90,
      Oct: 100,
      Nov: 110,
      Dec: 120,
    },
  };
}
afterEach(() => cleanup());
describe("Grid", () => {
  it("renders title, months, and input values", () => {
    const row = makeRow();
    render(<Grid row={row} />);

    // title
    expect(screen.getByText("Product A")).toBeInTheDocument();

    // months
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Dec")).toBeInTheDocument();

    // inputs for each month
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(12);

    // random value check
    expect(inputs[0]).toHaveValue(10);
    expect(inputs[11]).toHaveValue(120);
  });

  it("is disabled by default", async () => {
    const row = makeRow();
    const onEdit = vi.fn();

    render(<Grid row={row} onEdit={onEdit} />);

    const inputs = screen.getAllByRole("spinbutton"); //ARIA role

    expect(onEdit).not.toHaveBeenCalled();
    expect(inputs[0]).toBeDisabled();
  });

  it("calls onEdit when not disabled", async () => {
    const user = userEvent.setup();
    const row = makeRow();
    const onEdit = vi.fn();

    render(<Grid row={row} editable={true} onEdit={onEdit} />);
    const inputs = screen.getAllByRole("spinbutton"); //ARIA role
    fireEvent.change(inputs[0], { target: { value: "123" } });

    expect(inputs[0]).not.toBeDisabled();
    const lastCall = onEdit.mock.calls.at(-1); //Since each character triggers a call
    expect(lastCall).toBeTruthy();
    expect(lastCall?.[0]).toBe("Jan");
    expect(lastCall?.[1]).toBe(123);
  });
});
