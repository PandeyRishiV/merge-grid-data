import type { Month } from "../App";
import "./ChangesGrid.css";

export type ChangeRow = {
  month: Month;
  from: number; // Grid B
  to: number; // Grid A
  type: "pending" | "applied";
};

export default function ChangesGrid({
  changes,
  onMerge,
}: {
  changes: ChangeRow[];
  onMerge: (month: Month) => void;
}) {
  if (changes.length === 0) return null;

  return (
    <section className="changes">
      <h2 className="changes-title">Changes</h2>

      <table className="changes-table">
        <thead>
          <tr>
            <th className="changes-th">Month</th>
            <th className="changes-th">Grid B</th>
            <th className="changes-th">Grid A</th>
            <th className="changes-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((c, idx) => (
            <tr key={`${c.type}-${c.month}-${idx}`}>
              <td className="changes-td">{c.month}</td>
              <td className="changes-td">{c.from}</td>
              <td className="changes-td">{c.to}</td>
              <td className="changes-td">
                {c.type === "pending" ? (
                  <button
                    className="changes-merge"
                    onClick={() => onMerge(c.month)}
                  >
                    Merge
                  </button>
                ) : (
                  <span className="changes-applied">Applied</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
