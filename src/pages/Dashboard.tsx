import { useEffect } from "react";
import { globalError, globalLoading } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjects } from "../store/slices/projectSlice";
import {
  DataLineageView,
  DataTablesSummary,
  GovernanceStatusPanel,
  OperationsTimeline,
  ProjectHeader,
} from "../components/dashboard";
import {
  DashboardSection,
  ErrorPage,
  Loading,
  PageContainer,
  SectionErrorBoundary,
} from "../components/layout";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(globalError);
  const loading = useAppSelector(globalLoading);

  const handleRetry = (): void => {
    dispatch(fetchProjects());
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) return <ErrorPage error={error} reset={handleRetry} />;

  return (
    <PageContainer>
      <DashboardSection fullWidth>
        <SectionErrorBoundary sectionName="Project header">
          <ProjectHeader />
        </SectionErrorBoundary>
      </DashboardSection>

      <DashboardSection fullWidth>
        <SectionErrorBoundary sectionName="Data tables summary">
          <DataTablesSummary />
        </SectionErrorBoundary>
      </DashboardSection>

      <DashboardSection>
        <SectionErrorBoundary sectionName="Operations timeline">
          <OperationsTimeline />
        </SectionErrorBoundary>
      </DashboardSection>

      <DashboardSection>
        <SectionErrorBoundary sectionName="Governance status">
          <GovernanceStatusPanel />
        </SectionErrorBoundary>
      </DashboardSection>

      <DashboardSection fullWidth>
        <SectionErrorBoundary sectionName="Data lineage view">
          <DataLineageView />
        </SectionErrorBoundary>
      </DashboardSection>
    </PageContainer>
  );
}
