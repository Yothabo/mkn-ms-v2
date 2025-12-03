import React, { memo } from 'react';
import styles from './DataTable.module.css';

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
  hideHeadersOnMobile?: boolean;
}

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < 768);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const DataTable = memo(function DataTable({
  columns,
  data,
  isLoading = false,
  onRowClick,
  selectedRow,
  emptyMessage = "No data available",
  className = "",
  hideHeadersOnMobile = true
}: DataTableProps) {
  const isMobile = useIsMobile();
  const shouldHideHeaders = hideHeadersOnMobile && isMobile;

  if (isLoading) {
    return (
      <div className={`${styles.dataTable} ${className}`}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            {!shouldHideHeaders && (
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      style={{ width: column.width }}
                      className={`${styles.tableHeader} ${column.key === 'name' ? styles.nameHeader : ''}`}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className={`${styles.tableRow} ${styles.skeletonRow}`}>
                  {columns.map((_, j) => (
                    <td key={j}>
                      <div className={styles.skeletonLine} />
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
    <div className={`${styles.dataTable} ${className}`}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {!shouldHideHeaders && (
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    style={{ width: column.width }}
                    className={`${styles.tableHeader} ${column.key === 'name' ? styles.nameHeader : ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`${styles.tableRow} ${
                    selectedRow?.id === row.id ? styles.selected : ''
                  } ${onRowClick ? styles.clickable : ''}`}
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
});

export default DataTable;
