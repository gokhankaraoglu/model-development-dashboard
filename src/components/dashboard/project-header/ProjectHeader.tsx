import { getStatusColor, getTypeColorClasses } from "../../../utils/formatters";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { useProject } from "../../../hooks/useProjects";
import { EmptyState } from "../../ui/EmptyState";
import ProjectHeaderSkeleton from "./ProjectHeaderSkeleton";
import { formatDate } from "../../../utils/date";

export const ProjectHeader = () => {
  const { data: project, loading, error, refetch } = useProject("proj-001");

  if (loading) return <ProjectHeaderSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!project) return <EmptyState />;

  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-6">
        <div className="flex-1 min-w-75">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {project.project_name}
          </h1>
          <div className="flex gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide text-white ${getTypeColorClasses(
                project.project_type
              )}`}
            >
              {project.project_type}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide text-white ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
            {project.department && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide text-gray-900 bg-gray-100 border border-gray-200">
                {project.department.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                Owner:
              </span>
              <span className="text-gray-900 font-medium">
                {project.owner.name}
                {project.owner.title && (
                  <span className="text-gray-400 font-normal">
                    {" "}
                    ({project.owner.title})
                  </span>
                )}
              </span>
            </div>
            {project.governance_manager && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                  Governance Manager:
                </span>
                <span className="text-gray-900 font-medium">
                  {project.governance_manager.name}
                  {project.governance_manager.title && (
                    <span className="text-gray-400 font-normal">
                      {" "}
                      ({project.governance_manager.title})
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                Created:
              </span>
              <span className="text-gray-900 font-medium">
                {formatDate(project.created_at)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">
                Last Updated:
              </span>
              <span className="text-gray-900 font-medium">
                {formatDate(project.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {project.objectives && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-gray-900 font-semibold">Objectives</h3>
          <p className="text-gray-500 leading-relaxed">{project.objectives}</p>
        </div>
      )}
    </div>
  );
};
