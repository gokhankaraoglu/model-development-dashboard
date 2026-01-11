import { useEffect, useState, type JSX } from "react";
import { TableTypes, type ProjectTable } from "../../../types";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";
import { DashboardCard } from "../../layout";
import { DataLineageSkeleton } from "./DataLineageSkeleton";
import { EmptyState, ErrorMessage } from "../../ui";
import { useProjectTables, useTableRelations } from "../../../hooks";

interface Position {
  x: number;
  y: number;
}

interface TableNode {
  table: ProjectTable;
  position: Position;
  isHighlighted: boolean;
  isUpstream: boolean;
  isDownstream: boolean;
}

export const DataLineageView = () => {
  const currentProjectId = useAppSelector(selectedProjectId);
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);
  const [tableNodes, setTableNodes] = useState<TableNode[]>([]);
  const {
    data: relations,
    loading: relationsLoading,
    error: relationsError,
    refetch: refetchRelations,
  } = useTableRelations(currentProjectId);
  const {
    data: tables,
    loading: tablesLoading,
    error: tablesError,
    refetch: refetchTables,
  } = useProjectTables(currentProjectId);

  useEffect(() => {
    if (!tables || tables.length === 0) {
      setTableNodes([]);
      return;
    }

    const sourceTables = tables.filter(
      (t) => t.table_type === TableTypes.SOURCE
    );
    const derivedTables = tables.filter(
      (t) => t.table_type === TableTypes.DERIVED
    );

    const nodes: TableNode[] = [];

    sourceTables.forEach((table, index) => {
      nodes.push({
        table,
        position: {
          x: 50,
          y: 100 + index * 120,
        },
        isHighlighted: false,
        isUpstream: false,
        isDownstream: false,
      });
    });

    derivedTables.forEach((table, index) => {
      nodes.push({
        table,
        position: {
          x: 350,
          y: 100 + index * 120,
        },
        isHighlighted: false,
        isUpstream: false,
        isDownstream: false,
      });
    });

    setTableNodes(nodes);
  }, [tables]);

  useEffect(() => {
    if (!highlightedTable) {
      setTableNodes((prev) =>
        prev.map((node) => ({
          ...node,
          isHighlighted: false,
          isUpstream: false,
          isDownstream: false,
        }))
      );
      return;
    }

    if (!relations) return;

    const upstreamTables = new Set<string>();
    const downstreamTables = new Set<string>();

    relations.forEach((relation) => {
      if (relation.targetTable === highlightedTable) {
        upstreamTables.add(relation.sourceTable);
      }
      if (relation.sourceTable === highlightedTable) {
        downstreamTables.add(relation.targetTable);
      }
    });

    const findUpstream = (tableName: string, visited = new Set<string>()) => {
      if (visited.has(tableName)) return;
      visited.add(tableName);

      relations.forEach((relation) => {
        if (
          relation.targetTable === tableName &&
          !upstreamTables.has(relation.sourceTable)
        ) {
          upstreamTables.add(relation.sourceTable);
          findUpstream(relation.sourceTable, visited);
        }
      });
    };

    findUpstream(highlightedTable);

    setTableNodes((prev) =>
      prev.map((node) => ({
        ...node,
        isHighlighted: node.table.table_name === highlightedTable,
        isUpstream: upstreamTables.has(node.table.table_name),
        isDownstream: downstreamTables.has(node.table.table_name),
      }))
    );
  }, [highlightedTable, relations]);

  if (relationsLoading || tablesLoading) return <DataLineageSkeleton />;
  if (relationsError)
    return <ErrorMessage message={relationsError} onRetry={refetchRelations} />;
  if (tablesError)
    return <ErrorMessage message={tablesError} onRetry={refetchTables} />;
  if (!relations || !tables)
    return (
      <EmptyState
        title="Data Lineage"
        headerRight={
          <div className="flex gap-5 text-xs text-gray-600">
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-md border-2 border-gray-200 bg-blue-100" />
              Source tables
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-md border-2 border-gray-200 bg-emerald-100" />
              Derived tables
            </span>
          </div>
        }
        message="No tables available for lineage view."
      />
    );

  const handleTableClick = (tableName: string) => {
    setHighlightedTable((prev) => (prev === tableName ? null : tableName));
  };

  const getTableNodeClass = (node: TableNode) => {
    let className =
      "absolute w-40 rounded-lg border-2 bg-white p-3 text-xs shadow-sm transition-all duration-150 cursor-pointer";

    if (node.table.table_type === TableTypes.SOURCE) {
      className += " border-blue-500 bg-blue-50";
    } else {
      className += " border-emerald-600 bg-emerald-50";
    }

    if (node.isHighlighted) {
      className +=
        " border-amber-400 bg-amber-50 scale-105 shadow-md ring-2 ring-amber-200";
    } else if (node.isUpstream) {
      className += " border-emerald-500 bg-emerald-50";
    } else if (node.isDownstream) {
      className += " border-purple-500 bg-purple-50";
    } else if (highlightedTable && !node.isHighlighted) {
      className += " opacity-50";
    }

    return className;
  };

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    const safeRelations = relations ?? [];

    safeRelations.forEach((relation, index) => {
      const sourceNode = tableNodes.find(
        (n) => n.table.table_name === relation.sourceTable
      );
      const targetNode = tableNodes.find(
        (n) => n.table.table_name === relation.targetTable
      );

      if (!sourceNode || !targetNode) return;

      const isHighlighted =
        sourceNode.isHighlighted ||
        targetNode.isHighlighted ||
        sourceNode.isUpstream ||
        targetNode.isDownstream;

      const lineClass = isHighlighted
        ? "stroke-emerald-500 stroke-[3px] fill-none"
        : "stroke-gray-300 stroke-2 fill-none";

      const startX = sourceNode.position.x + 160;
      const startY = sourceNode.position.y + 40;
      const endX = targetNode.position.x;
      const endY = targetNode.position.y + 40;

      connections.push(
        <line
          key={`connection-${index}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          className={lineClass}
          markerEnd="url(#arrowhead)"
        />
      );
    });

    return connections;
  };

  const containerHeight = Math.max(
    300,
    Math.max(...tableNodes.map((n) => n.position.y)) + 100
  );

  return (
    <DashboardCard
      title="Data Lineage"
      headerRight={
        <div className="flex gap-5 text-xs text-gray-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-md border-2 border-gray-200 bg-blue-100" />
            Source tables
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-md border-2 border-gray-200 bg-emerald-100" />
            Derived tables
          </span>
        </div>
      }
    >
      <div className="relative mt-2 min-h-100 overflow-x-auto">
        <svg
          className="pointer-events-none absolute left-0 top-0 z-10"
          width="500"
          height={containerHeight}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-300" />
            </marker>
          </defs>
          {renderConnections()}
        </svg>
        {tableNodes.map((node) => (
          <div
            key={node.table.project_table_id}
            className={getTableNodeClass(node)}
            style={{
              left: node.position.x,
              top: node.position.y,
            }}
            onClick={() => handleTableClick(node.table.table_name)}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm">
                {node.table.table_type === TableTypes.SOURCE ? "📁" : "⚙️"}
              </span>
              <span className="text-xs font-semibold text-gray-900">
                {node.table.display_name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-gray-500">
                {node.table.table_name}
              </span>
            </div>
          </div>
        ))}
        <div className="absolute bottom-2 left-1/2 max-w-xs -translate-x-1/2 rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500 shadow-sm">
          {highlightedTable ? (
            <p>
              Showing dependencies for <strong>{highlightedTable}</strong>.
              Click on another table or the same table to change/clear
              selection.
            </p>
          ) : (
            <p>Click on a table to highlight its upstream dependencies.</p>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};
