import type { RootState } from "./store";

export const selectedProjectId = (state: RootState) =>
  state.project.selectedProjectId;
export const globalError = (state: RootState) => state.project.error;
export const globalLoading = (state: RootState) => state.project.loading;
export const allProjects = (state: RootState) => state.project.projects;
