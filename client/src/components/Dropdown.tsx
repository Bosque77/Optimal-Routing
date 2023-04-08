import React, { useState, useRef, useEffect } from "react";

type TableType = "orders" | "depots" | "landfills" | "";

const DropdownTable: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<TableType>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSelectedTable("");
    }
  };

  //   useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        className="w-64 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
        onClick={() =>
          setSelectedTable(selectedTable === "orders" ? "" : "orders")
        }
      >
        Orders
      </button>
      <div className="grid grid-cols-3 gap-4"></div>
      {selectedTable && (
        <div className="w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Item 1 ({selectedTable})
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Item 2 ({selectedTable})
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Item 3 ({selectedTable})
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownTable;
