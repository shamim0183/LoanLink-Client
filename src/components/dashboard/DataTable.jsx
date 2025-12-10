import React from "react"
/**
 * Reusable DataTable component for dashboard tables
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions [{key, label, render}]
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.emptyMessage - Message when no data
 * @param {string} props.className - Additional CSS classes
 */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found",
  className = "",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg opacity-70">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div
      className={`overflow-x-auto bg-base-100 rounded-lg shadow ${className}`}
    >
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.key || index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row._id || row.id || rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${column.key || colIndex}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
