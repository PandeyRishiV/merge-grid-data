import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import ChangesGrid, { type ChangeRow } from "./components/ChangesGrid";
import Grid from "./components/Grid";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type Month = (typeof MONTHS)[number];

export type Row = {
  id: string;
  name: string;
  values: Record<Month, number>;
};

const API_BASE = "http://localhost:3000";

/**
 * Clone a Row object
 * @param row
 * @returns A deep copy of the Row object
 */
export function cloneRow(row: Row): Row {
  return structuredClone(row);
}

export default function App() {
  const [gridA, setGridA] = useState<Row | null>(null);
  const [gridB, setGridB] = useState<Row | null>(null);
  const [appliedChanges, setAppliedChanges] = useState<ChangeRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/row/row1`);
        if (!res.ok) {
          throw new Error(`Failed to fetch Grid`);
        }

        const data: Row = await res.json();

        const valueCheck = Object.fromEntries(
          MONTHS.map((month) => [month, Number(data.values?.[month] ?? 0)]),
        ) as Record<Month, number>;

        const row: Row = {
          id: data.id,
          name: data.name,
          values: valueCheck,
        };

        setGridA(row);
        setGridB(cloneRow(row));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  /**
   * Update a cell in Grid A
   * @param month
   * @param value
   */
  const updateGridACell = useCallback(function updateGridACell(
    month: Month,
    value: number,
  ) {
    setGridA((prev) => {
      if (!prev) return prev;

      const values = { ...prev.values };
      values[month] = Number(value);
      return { ...prev, values };
    });
  }, []);

  /**
   * Merge a month from Grid A to Grid B
   * @param month
   * @returns none
   */
  const mergeMonth = useCallback(
    function mergeMonth(month: Month) {
      if (!gridA || !gridB) return;

      const from = gridB.values[month] ?? 0;
      const to = gridA.values[month] ?? 0;

      // update Grid B
      setGridB({
        ...gridB,
        values: {
          ...gridB.values,
          [month]: to,
        },
      });

      // log only if Grid B actually changed
      if (from !== to) {
        setAppliedChanges((prev) => [
          { month, from, to, type: "applied" },
          ...prev,
        ]);
      }
    },
    [gridA, gridB],
  );

  const pendingChanges: ChangeRow[] = useMemo(() => {
    return MONTHS.map((m) => {
      const a = gridA?.values[m] ?? 0;
      const b = gridB?.values[m] ?? 0;
      return a !== b
        ? { month: m, from: b, to: a, type: "pending" as ChangeRow["type"] }
        : null;
    }).filter((c) => !!c);
  }, [gridA, gridB]);

  const monthIndex = (m: Month) => MONTHS.indexOf(m);

  const changesToShow: ChangeRow[] = useMemo(() => {
    return [...pendingChanges, ...appliedChanges].sort((a, b) => {
      const mi = monthIndex(a.month) - monthIndex(b.month);
      if (mi !== 0) return mi;

      if (a.type === b.type) return 0;
      return a.type === "pending" ? -1 : 1;
    });
  }, [pendingChanges, appliedChanges]);

  if (isLoading) return <div className="page">Loading…</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!gridA || !gridB) return null;

  return (
    <div className="page">
      <div className="grids-container">
        <section className="section">
          <h2 className="title">Grid A</h2>
          <hr />
          <Grid row={gridA} editable onEdit={updateGridACell} />
        </section>
        <div className="grids-divider" />
        <section className="section">
          <h2 className="title">Grid B</h2>
          <hr />
          <Grid row={gridB} />
        </section>
      </div>

      <ChangesGrid changes={changesToShow} onMerge={mergeMonth} />
    </div>
  );
}
