import React from "react";
import { useTable, useFlexLayout, useResizeColumns } from "react-table";
import styles from '../Common/Table.module.css';

export const GraphTable = ({ columns, data, onRowClick }) => {
  const defaultColumn = React.useMemo(
    () => ({
      size: "auto", // Width of the column
      minWidth: 50,
      maxWidth: 300,
      resizable: true, // Make all columns resizable
    }),
    []
  );
  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow,
    resetResizing
    } = useTable(
      {
        columns,
        data,
        defaultColumn
      },
      useFlexLayout,
      useResizeColumns 
    );

  const handleRowClick = (row) => {
    // Call the passed onRowClick function with row information
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
  <div className={styles['table-view']}>
    <div className={styles['table-container']}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({
                  onClick: () => handleRowClick(row),
                  style: { cursor: "pointer" },
                })}
              >
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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
