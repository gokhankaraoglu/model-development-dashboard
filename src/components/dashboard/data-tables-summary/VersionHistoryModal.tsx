import React from "react";
import type { TableVersion } from "../../../types";
import { formatDate } from "../../../utils/date";

export interface VersionHistoryModalProps {
  versions: TableVersion[];
  tableName: string;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  versions,
  tableName,
  onClose,
}) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-1000"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h3>Version History - {tableName}</h3>
          <button
            className="bg-transparent border-none text-2xl cursor-pointer text-gray-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {versions.map((version) => (
            <div
              key={version.table_version_id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-blue-500">
                  v{version.version_number}
                </span>
                {version.is_materialized && (
                  <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs">
                    {version.checkpoint_type === "raw_upload" &&
                      "📁 Raw Upload"}
                    {version.checkpoint_type === "user_manual" &&
                      "🔖 Manual Checkpoint"}
                    {version.checkpoint_type === "development_gate" &&
                      "🚪 Dev Gate"}
                  </span>
                )}
                <span className="text-gray-500 text-sm ml-auto">
                  {formatDate(version.created_at)}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-500 mb-2">
                <span>Rows: {version.row_count}</span>
                <span>Columns: {version.column_count}</span>
                <span>Created by: {version.created_by}</span>
              </div>
              {version.checkpoint_name && (
                <div className="italic text-gray-500 text-sm">
                  {version.checkpoint_name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
