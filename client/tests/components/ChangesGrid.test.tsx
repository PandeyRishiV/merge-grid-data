import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { Month } from "../../src/App";
import ChangesGrid, { type ChangeRow } from "../../src/components/ChangesGrid";

afterEach(() => cleanup());

describe("ChangesGrid", () => {
  it("renders nothing when changes is empty", () => {
    const onMerge = vi.fn();
    const { container } = render(
      <ChangesGrid changes={[]} onMerge={onMerge} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders one table row per change", () => {
    const onMerge = vi.fn();
    const changes: ChangeRow[] = [
      { month: "Jan", from: 10, to: 20, type: "pending" },
      { month: "Feb", from: 30, to: 40, type: "applied" },
    ];

    render(<ChangesGrid changes={changes} onMerge={onMerge} />);

    expect(screen.getByText("Changes")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1 + changes.length); // +1 for header row
  });

  it("shows Merge button only for pending changes", () => {
    const onMerge = vi.fn();
    const changes: ChangeRow[] = [
      { month: "Jan", from: 10, to: 20, type: "pending" },
      { month: "Feb", from: 30, to: 40, type: "applied" },
    ];

    render(<ChangesGrid changes={changes} onMerge={onMerge} />);

    expect(screen.getByRole("button", { name: "Merge" })).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
  });
});
