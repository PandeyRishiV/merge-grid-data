import { MONTHS, type Month, type Row } from "../App";

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
          <th className="grid-th grid-th-name">Name</th>
          {MONTHS.map((month) => (
            <th key={month} className="grid-th">
              <span>{month}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="grid-total-row">
          <td className="grid-td grid-td-name">Total</td>
          {MONTHS.map((m) => (
            <td key={m} className="grid-td grid-total-cell">
              <input
                className="grid-input"
                type="number"
                value={totals[m]}
                readOnly
              />
            </td>
          ))}
        </tr>

        <tr>
          <td className="grid-td grid-td-name">{row.name}</td>
          {MONTHS.map((m) => {
            const val = row.values[m] ?? 0;

            return (
              <td key={m} className="grid-td">
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
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
