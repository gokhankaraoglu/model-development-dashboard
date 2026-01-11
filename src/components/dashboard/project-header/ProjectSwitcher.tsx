import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  allProjects,
  isOpenProjectModal,
  selectedProjectId,
} from "../../../store/selectors";
import {
  setSelectedProjectId,
  setIsProjectModalOpen,
} from "../../../store/slices/projectSlice";
import { Modal } from "../../layout";

export function ProjectSwitcher() {
  const dispatch = useAppDispatch();
  const currentProjectId = useAppSelector(selectedProjectId);
  const isOpen = useAppSelector(isOpenProjectModal);
  const projects = useAppSelector(allProjects);

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
    dispatch(setIsProjectModalOpen(false));
    setSearch("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(setIsProjectModalOpen(true))}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
      >
        Change project
      </button>

      {isOpen && (
        <Modal
          isOpen
          onClose={() => dispatch(setIsProjectModalOpen(false))}
          maxWidthClass="max-w-2xl"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Select project
            </h2>
            <button
              type="button"
              onClick={() => dispatch(setIsProjectModalOpen(false))}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
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
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-3 hover:bg-gray-50 cursor-pointer ${
                  project.project_id === currentProjectId ? "bg-emerald-50" : ""
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
        </Modal>
      )}
    </>
  );
}

export default ProjectSwitcher;
