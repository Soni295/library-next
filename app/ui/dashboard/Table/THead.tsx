interface THeadProps {
  headers: string[];
}

export function THead({ headers }: THeadProps) {
  return (
    <thead className="min-w-full leading-normal">
      <tr>
        {headers.map((header, index) => (
          <th
            key={header + index}
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold hidden sm:table-cell uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
