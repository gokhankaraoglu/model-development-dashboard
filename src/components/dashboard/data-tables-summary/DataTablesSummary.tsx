import { useState } from "react";
import { DataTablesSkeleton, ExpandableRow } from ".";
import { selectedProjectId } from "../../../store/selectors";
import { useAppSelector } from "../../../store/hooks";
import { useProjectTables } from "../../../hooks";
import { EmptyState, ErrorMessage } from "../../ui";
import { DashboardCard } from "../../layout";

export const DataTablesSummary = () => {
  const currentProjectId = useAppSelector(selectedProjectId);
  const {
    data: tables,
    loading,
    error,
    refetch,
  } = useProjectTables(currentProjectId);

  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  if (loading) return <DataTablesSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!tables)
    return (
      <EmptyState
        title="Data Tables Summary"
        headerRight={<span className="text-gray-600">0 tables</span>}
        message="No tables available for this project."
      />
    );

  const toggleExpand = (tableId: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId);
    } else {
      newExpanded.add(tableId);
    }
    setExpandedTables(newExpanded);
  };

  const columns = [
    "Table Name",
    "Type",
    "Version",
    "Rows",
    "Columns",
    "Actions",
  ];

  return (
    <DashboardCard
      title="Data Tables Summary"
      headerRight={
        <span className="text-gray-600">{tables.length} tables</span>
      }
    >
      <div className="overflow-x-auto">
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              {columns.map((label) => (
                <th
                  key={label}
                  className="bg-gray-100 p-4 text-left text-sm font-semibold text-gray-900 border-b-2 border-gray-200"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <ExpandableRow
                key={table.project_table_id}
                table={table}
                isExpanded={expandedTables.has(table.project_table_id)}
                onToggle={() => toggleExpand(table.project_table_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};
