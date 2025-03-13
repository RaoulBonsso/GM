"use client";

import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: (item: T) => string;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyMessage = "Aucune donnée disponible",
  className = '',
  headerClassName = '',
  rowClassName = () => '',
}: TableProps<T>) {
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render empty state
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className={`bg-gray-50 ${headerClassName}`}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => {
            const key = keyExtractor(item);
            const customRowClassName = rowClassName(item);
            
            return (
              <tr 
                key={key}
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${customRowClassName}`}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {columns.map((column, columnIndex) => {
                  const cellValue = typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor as keyof T];
                  
                  return (
                    <td
                      key={`${key}-${columnIndex}`}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                    >
                      {cellValue as React.ReactNode}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
