// Very basic CSV parser for tab or comma delimited, first row = header
export function parseCSV(csv: string): Record<string, string | number>[] {
  const lines = csv.trim().split("\n");
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const header = lines[0].split(delimiter).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    return Object.fromEntries(values.map((v, i) => {
      // Try convert to number, else keep string
      const num = Number(v);
      return [header[i], isNaN(num) ? v : num];
    }));
  });
}
