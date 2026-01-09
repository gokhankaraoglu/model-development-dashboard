import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getProjects } from "../../api/endpoints/projects";
import type { Project } from "../../types";

export interface ProjectState {
  projects: null | Project[];
  selectedProjectId: string;
  loading: boolean;
  error: string | null;
  isProjectModalOpen: boolean;
}

const initialState: ProjectState = {
  projects: null,
  selectedProjectId: "",
  loading: false,
  error: null,
  isProjectModalOpen: true,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    return getProjects();
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedProjectId(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload;
    },
    setIsProjectModalOpen(state, action: PayloadAction<boolean>) {
      state.isProjectModalOpen = action.payload;
    },
    clearProject: (state) => {
      state.projects = null;
      state.error = null;
      state.loading = false;
      state.selectedProjectId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.selectedProjectId = action.payload[0]?.project_id;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setSelectedProjectId, setIsProjectModalOpen, clearProject } =
  projectSlice.actions;

export default projectSlice.reducer;
