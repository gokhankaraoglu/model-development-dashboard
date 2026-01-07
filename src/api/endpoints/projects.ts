import type { Project } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getProjects(): Promise<Project[]> {
  return api(async () => {
    const projects = mockDB.projects as Project[];

    if (!projects) {
      throw new Error(`Projects not found`);
    }
    return projects;
  });
}

export function getProject(projectId: string): Promise<Project> {
  return api<Project>(async () => {
    const project = mockDB.projects.find(
      (project) => project.project_id === projectId
    );
    if (!project) {
      throw new Error(`Project with id ${projectId} not found`);
    }
    return project;
  });
}
