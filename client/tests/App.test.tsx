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
