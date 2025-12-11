import React from "react"
const ReceiptTable = ({ title, rows }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 text-primary">{title}</h3>
      <table className="table table-zebra w-full">
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="font-semibold w-1/3">{row.label}</td>
              <td className={`text-right ${row.className || ""}`}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReceiptTable
