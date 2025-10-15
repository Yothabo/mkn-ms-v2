/* src/shared/components/tables/DataTable.tsx */
import React from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  onRowClick?: (row: any) => void;
  selectedRow?: any;
  emptyMessage?: string;
  className?: string;
}

export default function DataTable({
  columns,
  data,
  isLoading = false,
  onRowClick,
  selectedRow,
  emptyMessage = "No data available",
  className = ""
}: DataTableProps) {
  if (isLoading) {
    return (
      <div className={`data-table ${className}`}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    style={{ width: column.width }}
                    className={`table-header ${column.key === 'name' ? 'name-header' : ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="table-row skeleton-row">
                  {columns.map((_, j) => (
                    <td key={j}>
                      <div className="skeleton-line" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={`table-header ${column.key === 'name' ? 'name-header' : ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`table-row ${
                    selectedRow?.id === row.id ? 'selected' : ''
                  } ${onRowClick ? 'clickable' : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td key={column.key} style={{ width: column.width }}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
