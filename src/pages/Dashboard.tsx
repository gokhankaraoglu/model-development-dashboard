import { useEffect } from "react";
import { DataTablesSummary } from "../components/dashboard/data-tables-summary/DataTablesSummary";
import { ProjectHeader } from "../components/dashboard/project-header/ProjectHeader";
import PageContainer from "../components/layout/PageContainer";
import { DashboardSection } from "../components/layout/DashboardSection";
import { OperationsTimeline } from "../components/dashboard/operations-timeline/OperationsTimeline";
import { globalError, globalLoading } from "../store/selectors";
import Error from "../components/layout/ErrorPage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjects } from "../store/slices/projectSlice";
import Loading from "../components/layout/Loading";
import { GovernanceStatusPanel } from "../components/dashboard/governance-status-panel/GovernanceStatusPanel";
import { DataLineageView } from "../components/dashboard/data-lineage-view/DataLineageView";

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

  if (error) return <Error error={error} reset={handleRetry} />;

  return (
    <PageContainer>
      <DashboardSection fullWidth>
        <ProjectHeader />
      </DashboardSection>

      <DashboardSection fullWidth>
        <DataTablesSummary />
      </DashboardSection>

      <DashboardSection>
        <OperationsTimeline />
      </DashboardSection>

      <DashboardSection>
        <GovernanceStatusPanel />
      </DashboardSection>

      <DashboardSection fullWidth>
        <DataLineageView />
      </DashboardSection>
    </PageContainer>
  );
}
