import { ReactNode, useState, useMemo } from 'react';
import { themeConfig } from '../../config/theme';
import { FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from './Button';
import { Loading } from './Loading';

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  sortable?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  };
  striped?: boolean;
  hover?: boolean;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * Composant Table réutilisable avec tri, pagination et personnalisation
 */
export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  onRowClick,
  sortable = true,
  pagination,
  striped = true,
  hover = true,
  className = '',
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Tri des données
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  // Pagination des données
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <FaSort className="text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <FaSortUp style={{ color: themeConfig.colors.primary }} />;
    }
    return <FaSortDown style={{ color: themeConfig.colors.primary }} />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading text="Chargement des données..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: themeConfig.text.secondary }}>
        {emptyMessage}
      </div>
    );
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: themeConfig.backgrounds.sidebar }}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left font-semibold border-b ${
                  column.sortable && sortable ? 'cursor-pointer select-none' : ''
                } ${hover && column.sortable && sortable ? 'hover:bg-opacity-80' : ''}`}
                style={{
                  color: themeConfig.text.primary,
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b transition-colors ${
                striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''
              } ${hover && onRowClick ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3"
                  style={{
                    color: themeConfig.text.primary,
                    textAlign: column.align || 'left',
                  }}
                >
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <div style={{ color: themeConfig.text.secondary }}>
            Page {pagination.page} sur {totalPages} ({pagination.total} résultats)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              leftIcon={<FaChevronLeft />}
            >
              Précédent
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => pagination.onPageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              rightIcon={<FaChevronRight />}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
