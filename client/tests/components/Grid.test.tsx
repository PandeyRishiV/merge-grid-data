// import "@testing-library/jest-dom";
// import { describe, it, expect, vi } from "vitest";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Grid from "../../src/components/Grid";
// import type { Row } from "../../src/App";

// function makeRow(): Row {
//     return {
//         id: "row1",
//         name: "Product A",
//         values: {
//             Jan: 10,
//             Feb: 20,
//             Mar: 30,
//             Apr: 40,
//             May: 50,
//             Jun: 60,
//             Jul: 70,
//             Aug: 80,
//             Sep: 90,
//             Oct: 100,
//             Nov: 110,
//             Dec: 120,
//         }
//     };
// }

// describe("Grid", () => {
//     it("renders title, months, and input values", () => {
//         const row = makeRow();
//         render(<Grid row={row} />);

//         // title
//         expect(screen.getByText("Product A")).toBeInTheDocument();

//         // months (vertical layout: month labels are in cells)
//         expect(screen.getByText("Jan")).toBeInTheDocument();
//         expect(screen.getByText("Dec")).toBeInTheDocument();

//         // inputs: 12 month inputs
//         const inputs = screen.getAllByRole("spinbutton");
//         expect(inputs).toHaveLength(12);

//         // spot check some values (inputs are strings)
//         expect(inputs[0]).toHaveValue(10);
//         expect(inputs[11]).toHaveValue(120);
//     });

//     it("is read-only by default", async () => {
//         const user = userEvent.setup();
//         const row = makeRow();
//         const onEdit = vi.fn();

//         render(<Grid row={row} onEdit={onEdit} />);

//         const inputs = screen.getAllByRole("spinbutton");
//         await user.type(inputs[0], "999");

//         expect(onEdit).not.toHaveBeenCalled();
//         expect(inputs[0]).toHaveAttribute("readonly");
//     });

//     it("calls onEdit when editable", async () => {
//         const user = userEvent.setup();
//         const row = makeRow();
//         const onEdit = vi.fn();

//         render(<Grid row={row} editable onEdit={onEdit} />);

//         const inputs = screen.getAllByRole("spinbutton");
//         await user.clear(inputs[0]);
//         await user.type(inputs[0], "123");

//         // onChange fires multiple times while typing; assert last call
//         const lastCall = onEdit.mock.calls.at(-1);
//         expect(lastCall).toBeTruthy();
//         expect(lastCall?.[0]).toBe("Jan");
//         expect(lastCall?.[1]).toBe(123);
//     });
// });
