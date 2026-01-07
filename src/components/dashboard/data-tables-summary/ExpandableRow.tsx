import React, { useState } from "react";
import type { ProjectTable } from "../../../types";
import { RoleColors } from "../../../utils/formatters";
import { VersionHistoryModal } from "./VersionHistoryModal";

export interface ExpandableRowProps {
  table: ProjectTable;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExpandableRow: React.FC<ExpandableRowProps> = ({
  table,
  isExpanded,
  onToggle,
}) => {
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const currentVersion = table.versions.find(
    (versionInfo) => versionInfo.table_version_id === table.current_version_id
  );
  const hasCheckpoints = table.versions.some(
    (version) => version.checkpoint_type !== null
  );

  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-gray-100"
        onClick={onToggle}
      >
        <td className="p-4 border-b border-gray-200 align-top">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm w-3">
              {isExpanded ? "▼" : "▶"}
            </span>
            <div>
              <div className="font-semibold text-gray-900">
                {table.display_name}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {table.table_name}
              </div>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-gray-200 align-top">
          <span
            className={`px-2 py-1 rounded text-xs font-medium capitalize ${
              table.table_type === "source"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-700"
            }`}
          >
            {table.table_type}
          </span>
        </td>
        <td className="p-4 border-b border-gray-200 align-top">
          v{currentVersion?.version_number || "N/A"}
        </td>
        <td className="p-4 border-b border-gray-200 align-top">
          {currentVersion?.row_count || "N/A"}
        </td>
        <td className="p-4 border-b border-gray-200 align-top">
          {currentVersion?.column_count || "N/A"}
        </td>
        <td className="p-4 border-b border-gray-200 align-top">
          <div className="flex items-center gap-2">
            {hasCheckpoints && <span className="text-base">🔖</span>}
            <button
              className="bg-transparent border border-gray-200 px-2 py-1 rounded text-xs cursor-pointer transition-colors hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowVersionHistory(true);
              }}
            >
              History ({table.versions.length})
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-slate-50">
          <td colSpan={6} className="p-4 border-b-2 border-gray-200">
            <div>
              <h4 className="mb-4 text-gray-900">Columns</h4>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
                {table.columns.map((column) => (
                  <div
                    key={column.column_id}
                    className="bg-white p-3 rounded-lg shadow-sm"
                    style={{
                      borderLeft: `4px solid ${RoleColors[column.role]}`,
                    }}
                  >
                    <div className="font-semibold text-gray-900 mb-1">
                      {column.display_name}
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="text-gray-500 font-mono">
                        {column.column_name}
                      </span>
                      <span className="text-gray-500 capitalize">
                        {column.data_type}
                      </span>
                      <span
                        className="font-semibold uppercase"
                        style={{ color: RoleColors[column.role] }}
                      >
                        {column.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}

      {showVersionHistory && (
        <VersionHistoryModal
          versions={table.versions}
          tableName={table.display_name}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
    </>
  );
};
