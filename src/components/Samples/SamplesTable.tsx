import React, { useState, useEffect } from 'react';
import { useTable, useFlexLayout, useResizeColumns } from 'react-table';
import styles from '../Common/Table.module.css';

export const SamplesTable = ({ columns, data, onRowClick, onCollapsedRowsChange }: SamplesTable) => {
  const [collapsedRows, setCollapsedRows] = useState<CollapsedRow>({});

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      maxWidth: 300,
      resizable: true
    }),
    []
  );

  const handleCollapseClick = (id: string) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleChildRowClick = (row: Row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const isAncestorCollapsed = (row: Row, collapsedRows: CollapsedRow): boolean => {
    if (!row.original.parentId) {
      return false; // Root level
    }
    if (collapsedRows[row.original.parentId]) {
      return true; // Immediate parent is collapsed
    }
    // Recursively check higher-level ancestors
    const parentRow = rows.find((r: Row) => r.original.id === row.original.parentId);
    return parentRow ? isAncestorCollapsed(parentRow, collapsedRows) : false;
  };

  const flattenData = (data: Samples, parentId = null, depth = 0): any[] => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const startingData = parentId === null ? data.flatMap(d => d.Children || []) : data;

    useEffect(() => {
      onCollapsedRowsChange(collapsedRows);
    }, [collapsedRows, onCollapsedRowsChange]);

    return startingData.flatMap((item) => {
        const isParent = item.Children && item.Children.length > 0;
        // Constructing a unique ID for the parent
        const id = parentId === null ? item.FileName : `${parentId}-${item.FileName}`;
        const flatItem = { ...item, parentId, isParent, depth, id };

        // When flattening children, pass the newly constructed id as their parentId
        const children = isParent ? flattenData(item.Children, id, depth + 1) : [];
        return [flatItem, ...children];
    });
  };

  const flatData = flattenData(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: flatData,
      defaultColumn
    },
    useFlexLayout,
    useResizeColumns
  );

  return (
  <div className={styles['table-view']}>
    <div className={styles['table-container']}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, columnIndex: number) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Add resizer div for all columns except the last one */}
                    {columnIndex < headerGroup.headers.length - 1 && (
                      <div
                        {...column.getResizerProps()}
                        className={`${styles['resizer']} ${column.isResizing ? styles['is-resizing'] : ''}`}
                        onClick={(event) => event.stopPropagation()}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row) => {
              prepareRow(row);
              const isParentRow = row.original.isParent;
              const isChildRow = row.original.parentId !== null;
              const isAncCollapsed = isChildRow && isAncestorCollapsed(row, collapsedRows);
              const shouldRenderRow = isParentRow || !isAncCollapsed;

              if (!shouldRenderRow) {
                return null;
              }

              return (
                <tr 
                  {...row.getRowProps({
                    style: { cursor: isParentRow ? 'pointer' : 'default' },
                    onClick: isParentRow
                      ? () => handleCollapseClick(row.original.id)
                      : isChildRow
                      ? () => handleChildRowClick(row)
                      : undefined
                  })}
                >
                  {row.cells.map((cell: Cell, index: number) => {
                    // Customize rendering for the first cell of parent rows
                    if (index === 0 && isParentRow) {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    }

                    // For parent rows, leave the second cell blank
                    if (index === 1 && isParentRow) {
                      return <td {...cell.getCellProps()}></td>;
                    }

                    // Default rendering for other cells
                    return <td {...cell.getCellProps({
                      className: `${styles['table-cell']}`
                  })}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
