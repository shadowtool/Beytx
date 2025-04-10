"use client";

import { CloseIconCircle, TickIcon } from "@/imports/icons";
import React from "react";

function Table({ headers, data }) {
  return (
    <div className="w-full overflow-x-auto min-h-full">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="text-left px-4 py-3 border-b">
                {header !== "options" ? header : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {headers.map((key, colIndex) => {
                  const value = row[key.toLowerCase()];
                  return (
                    <td key={colIndex} className="px-4 py-2">
                      {typeof value === "boolean" ? (
                        value ? (
                          <TickIcon size={21} className="text-emerald-600" />
                        ) : (
                          <CloseIconCircle size={21} className="text-red-600" />
                        )
                      ) : (
                        value ?? "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-4 text-gray-400"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
