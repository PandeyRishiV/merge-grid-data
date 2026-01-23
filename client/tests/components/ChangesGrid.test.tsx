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

});
