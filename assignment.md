# Assignment: Grid Merge Tool

## Objective
The goal of this assignment is to complete the implementation of the "Grid Merge Tool". You will be working with a React frontend and an Express backend.

## Getting Started
- The `client` directory contains a React application that displays two grids.
- The `backend` directory contains an Express server with some initial data.

## Tasks

### 1. Backend: Expose Grid Data
- In `backend/app.ts`, create an API endpoint (e.g., `/api/data`) that returns the `Rows` and `rowValues` data.

### 2. Frontend: Fetch Data from the Backend
- In `client/src/App.tsx`, fetch the grid data from the API endpoint you created in the backend.
- Use the fetched data to populate both Grid A and Grid B.

### 3. Implement Cell Editing
- In `client/src/App.tsx`, implement the `onCellChange` handler for Grid A.

### 4. Implement change tracking and the "Changes" grid
- In `client/src/App.tsx`, implement logic to track changes made in both Grid A and Grid B.
- Create a new "Changes" grid that displays the differences between the previous and current values in Grids.


### 4. Implement the Merge Functionality
- In `client/src/App.tsx`, in the "Changes" grid for Grid A, add a "Merge" button for each row.
- When the "Merge" button for a row is clicked, the values of that row in Grid A should be copied to the corresponding row in Grid B.
- The UI should update to show the new values in Grid B.

### Task 5: Calculate and Display Totals
- In both Grid A and Grid B, implement a footer row that calculates and displays the totals for each month.
- Ensure that the totals update correctly when cell values are edited or when changes are merged. When this button is clicked:
  - Iterate over the changes listed in the "Changes" grid.
  - For each change, update the corresponding cell in Grid B with the new value from Grid A.
  - Update the UI to reflect the changes in Grid B.
