
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

function cloneRow(row: Row): Row {
  return {
    id: row.id,
    name: row.name,
    values: { ...row.values },
  };
}

export default function App() {
  const [gridA, setGridA] = useState<Row | null>(null);
  const [gridB, setGridB] = useState<Row | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/row/row1`);
        if (!res.ok) {
          throw new Error(`Failed to fetch Grid`);
        }

        const data: Row = (await res.json()) as Row;

        if (cancelled) return;

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
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateGridACell(month: Month, value: number) {
    setGridA((prev) => {
      if (!prev) return prev;

      const values = { ...prev.values };
      values[month] = Number(value);
      return { ...prev, values };
    });
  }

  function updateGridBCell(month: Month, value: number) {
    setGridB((prev) => {
      if (!prev) return prev;

      const values = { ...prev.values };
      values[month] = Number(value);
      return { ...prev, values };
    });
  }
      </div>
    </div>

  );
}