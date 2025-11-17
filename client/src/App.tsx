import React, { useState, useMemo } from 'react';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const;

type Month = typeof MONTHS[number];





export default function App() {

  return (
    <div className="flex justify-center p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Grid Merge Tool</h1>


      {/* <div className="">
        <GridTable
          title="Grid A (Source)"
          gridData={GridAData}
          isEditable={true}
          onCellChange={() => { }}
        />

        <GridTable
          title="Grid B (Target)"
          gridData={GridBData}
          isEditable={false}
        /> */}

    </div >
  );
}


interface GridTableProps {
  title: string;
  gridData: Array<{
    id: string;
    name: string;
    values: Record<Month, number>;
  }>;
  isEditable: boolean;
  onCellChange?: (rowId: string, month: Month, value: string) => void;
}

function GridTable({
  title,
  isEditable,
  gridData,
  onCellChange,
}: GridTableProps) {




  return (

    <div className="border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className={`text-xl font-semibold p-4 rounded-t-lg ${isEditable ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 w-12">
                Row
              </th>
              {MONTHS.map(month => (
                <th key={month} className=" text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  {month}
                </th>
              ))}
              {isEditable && (
                <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10 w-12">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gridData.map(row => {
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 sticky left-0 bg-white z-10 w-14">
                    {row.name}
                  </td>
                  {MONTHS.map(month => {
                    const value = row.values[month];
                    const cellClassName = "transition-colors duration-300";



                    return (
                      <td key={month} className="px-3 py-2 whitespace-nowrap w-12">
                        <input
                          type="number"
                          value={value}
                          readOnly={!isEditable}
                          onChange={e => onCellChange?.(row.id, month, e.target.value)}
                          className={` text-right p-1 border rounded-md ${isEditable ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-transparent'} ${cellClassName}`}
                        />
                      </td>
                    );
                  })}
                  {isEditable && onMerge && onResetRow && (
                    <td className="px-3 py-2 whitespace-nowrap sticky right-0 bg-white z-10 w-12">
                      <button
                        onClick={() => onMerge(row.id)}
                        className="mr-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Merge
                      </button>

                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
}