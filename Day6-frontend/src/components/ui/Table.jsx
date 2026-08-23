export function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-app-border bg-app-bg ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-app-border bg-app-code text-xs font-semibold uppercase tracking-wider text-app-text">
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}