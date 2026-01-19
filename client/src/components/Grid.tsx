import { MONTHS, type Month, type Row } from "../App";

export function Grid({
  row,
  editable = false,
  onEdit,
}: {
  row: Row;
  editable?: boolean;
  onEdit?: (month: Month, value: number) => void;
}) {
  return (
    <table className="grid">
      <thead>
        <tr>
          <th className="grid__th grid__th--name">Name</th>
          {MONTHS.map((month) => (
            <th key={month} className="grid__th grid__th--month">
              {month}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="grid__td grid__td--name">{row.name}</td>
          {MONTHS.map((m) => {
            const val = row.values[m] ?? 0;

            return (
              <td key={m} className="grid__td">
                <input
                  className="grid__input"
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
