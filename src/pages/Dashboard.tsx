import { DataTablesSummary } from "../components/dashboard/data-tables-summary/DataTablesSummary";
import { ProjectHeader } from "../components/dashboard/project-header/ProjectHeader";
import PageContainer from "../components/layout/PageContainer";
import { OperationsTimeline } from "../components/dashboard/operations-timeline/OperationsTimeline";

export function Dashboard() {
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
