import { useEffect } from "react";
import { DataTablesSummary } from "../components/dashboard/data-tables-summary/DataTablesSummary";
import { ProjectHeader } from "../components/dashboard/project-header/ProjectHeader";
import PageContainer from "../components/layout/PageContainer";
import { OperationsTimeline } from "../components/dashboard/operations-timeline/OperationsTimeline";
import { globalError, globalLoading } from "../store/selectors";
import Error from "../components/layout/ErrorFallback";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjects } from "../store/slices/projectSlice";
import Loading from "../components/layout/Loading";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(globalError);
  const loading = useAppSelector(globalLoading);

  useEffect(() => {
    void dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error)
    return <Error error={error} reset={() => window.location.reload()} />;

  return (
    <PageContainer>
      <section className="col-span-2">
        <ProjectHeader />
      </section>

      <section className="col-span-2">
        <DataTablesSummary />
      </section>

      <section>
        <OperationsTimeline />
      </section>
    </PageContainer>
  );
}
