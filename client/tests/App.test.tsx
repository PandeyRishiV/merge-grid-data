import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App, { Row } from "../src/App";

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

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => cleanup());

function mockFetch(row: Row) {
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => row,
  } as Response);
}

describe("App", () => {
  it("calls fetch on mount", async () => {
    mockFetch(makeRow());

    render(<App />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/row/row1",
      );
    });
  });

  it("shows error when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<App />);

    expect(
      await screen.findByText("Error: Failed to fetch Grid"),
    ).toBeInTheDocument();
  });

  it("editing Grid A creates a change (pending)", async () => {
    mockFetch(makeRow());

    render(<App />);

    // Grid A is editable and Grid B is disabled.
    let enabledInputs: HTMLInputElement[] = [];

    await waitFor(() => {
      enabledInputs = screen
        .getAllByRole("spinbutton")
        .filter(
          (el) => !(el as HTMLInputElement).disabled,
        ) as HTMLInputElement[];

      expect(enabledInputs.length).toBe(12);
    });

    expect(enabledInputs.length).toBeGreaterThan(0);
    expect(enabledInputs[0]).toHaveValue(10);

    fireEvent.change(enabledInputs[0], { target: { value: "123" } });

    // ChangesGrid should now exist and include Jan
    expect(await screen.findByText("Changes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Merge" })).toBeInTheDocument();
  });
