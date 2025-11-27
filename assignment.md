## Part 1
### 1. Backend: Expose Grid Data
- In `backend/app.ts`, create API endpoints that return the required data to render grids on the client.

### 2. Frontend: Fetch Data from the Backend
- In `client/src/App.tsx`, fetch the grid data from the API endpoints created in the backend.
- Use the fetched data to populate Grid A and Grid B.

### 3. Implement Cell Editing
- In `client/src/App.tsx`, implement functionality to edit cells within Grid A.

## Part 2
### 4. Implement Change Tracking and the "Changes" Grid
- In `client/src/App.tsx`, implement logic to track changes made in both Grid A and Grid B.
- Create a new grid component named "Changes" that displays the differences between the previous and current values.
- Display each change as a distinct row within the "Changes" grid.
- Include a "Merge" button within each row.

### 5. Implement the Merge Functionality
- In `client/src/App.tsx`, ensure the "Merge" button in the "Changes" grid is functional.
- When clicked, the values from the specific row in Grid A should overwrite the corresponding row values in Grid B.
- The UI must immediately reflect the updated values in Grid B.

## Part 3
### 6. Calculate and Display Totals
- In both Grid A and Grid B, add a summary row at the top that calculates and displays the totals for each month column.
- Ensure that these totals automatically assume the correct values when cells are edited or when changes are merged.
