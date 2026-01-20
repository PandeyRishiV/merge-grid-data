import { MONTHS, type Month, type Row } from "../App";
import "./Grid.css";

export default function Grid({
  row,
  editable = false,
  onEdit,
}: {
  row: Row;
  editable?: boolean;
  onEdit?: (month: Month, value: number) => void;
}) {
  const totals = MONTHS.reduce(
    (acc, m) => {
      acc[m] = row.values[m] ?? 0;
      return acc;
    },
    {} as Record<(typeof MONTHS)[number], number>,
  );
  return (
    <table className="grid">
      <thead>
        <tr>
          <th colSpan={3}>
            <h3>{row.name}</h3>
          </th>
        </tr>
        <tr>
          <th className="grid-th">Month</th>
          <th className="grid-th">Value</th>
          <th className="grid-th">Total</th>
        </tr>
      </thead>

      <tbody>
        {MONTHS.map((m) => {
          const val = row.values[m] ?? 0;

          return (
            <tr key={m}>
              <td className="grid-td">{m}</td>
              <td className="grid-td">
                <input
                  className="grid-input"
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    onEdit?.(m, Number.isFinite(next) ? next : 0);
                  }}
                  readOnly={!editable}
                />
              </td>
              <td className="grid-td">{totals[m]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
