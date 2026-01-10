import { useMemo, useState } from "react";
import dayjs from "dayjs";
import type { Operation } from "../../../types";
import { Modal } from "../../layout/Modal";
import { OperationItem } from "./OperationItem";

interface AllOperationsModalProps {
  operations: Operation[];
}

export function AllOperationsModal({ operations }: AllOperationsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return operations.filter((op) => {
      const nameMatch = titleFilter
        ? op.operation_name.toLowerCase().includes(titleFilter.toLowerCase())
        : true;

      if (!nameMatch) return false;

      const ts = dayjs(op.execution_timestamp);
      if (!ts.isValid()) return false;

      if (fromDate) {
        const fromTs = dayjs(fromDate, "YYYY-MM-DD").startOf("day");
        if (fromTs.isValid() && ts.isBefore(fromTs)) return false;
      }

      if (toDate) {
        const toTs = dayjs(toDate, "YYYY-MM-DD").endOf("day");
        if (toTs.isValid() && ts.isAfter(toTs)) return false;
      }

      return true;
    });
  }, [operations, titleFilter, fromDate, toDate]);

  const handleClear = () => {
    setTitleFilter("");
    setFromDate("");
    setToDate("");
  };

  return (
    <>
      <div className="flex justify-center border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-colors cursor-pointer hover:bg-slate-50"
        >
          View All Operations
        </button>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          maxWidthClass="max-w-3xl"
        >
          <div className="flex h-150 flex-col">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Operations
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Filter operations by date range and name.
                </p>
              </div>
              <button
                className="bg-transparent border-none text-2xl cursor-pointer text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mb-3 flex items-end justify-between gap-3 text-xs sm:text-sm">
              <div className="grid flex-1 grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-slate-700">Title</label>
                  <input
                    type="text"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    placeholder="Search by operation name"
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-slate-700">
                    From date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-slate-700">To date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 mb-0.5"
              >
                Clear
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {filtered.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  No operations match the current filters.
                </p>
              ) : (
                filtered.map((operation) => (
                  <OperationItem
                    key={operation.operation_log_id}
                    operation={operation}
                  />
                ))
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
