import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { allProjects, selectedProjectId } from "../../../store/selectors";
import { setSelectedProjectId } from "../../../store/slices/projectSlice";

export function ProjectSwitcher() {
  const dispatch = useAppDispatch();
  const currentProjectId = useAppSelector(selectedProjectId);
  const projects = useAppSelector(allProjects);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(
    () =>
      (projects ?? []).filter((p) => {
        const q = search.toLowerCase();
        return (
          p.project_name.toLowerCase().includes(q) ||
          p.project_id.toLowerCase().includes(q)
        );
      }),
    [projects, search]
  );

  const handleSelect = (projectId: string) => {
    dispatch(setSelectedProjectId(projectId));
    setIsOpen(false);
    setSearch("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        Change project
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Select project
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-3"
            />

            <div className="h-64 overflow-y-auto divide-y divide-gray-100">
              {filteredProjects.length === 0 && (
                <p className="py-4 text-sm text-gray-500 text-center">
                  No projects found.
                </p>
              )}

              {filteredProjects.map((project) => (
                <button
                  key={project.project_id}
                  type="button"
                  onClick={() => handleSelect(project.project_id)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-3 hover:bg-gray-50 ${
                    project.project_id === currentProjectId
                      ? "bg-emerald-50"
                      : ""
                  }`}
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {project.project_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {project.project_id}
                    </div>
                  </div>
                  {project.project_id === currentProjectId && (
                    <span className="text-[11px] font-semibold text-emerald-600">
                      Current
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectSwitcher;
