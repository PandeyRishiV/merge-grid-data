const MONTHS = [
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

export class Row {
  public id: string;
  public name: string;
  public values: Record<Month, number>;

  constructor(id: string, name: string, values: Record<Month, number>) {
    this.id = id;
    this.name = name;
    this.values = values;
  }
}
