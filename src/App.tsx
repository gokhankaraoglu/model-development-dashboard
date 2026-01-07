import { DataTablesSummary } from "./components/dashboard/data-tables-summary/DataTablesSummary";
import { ProjectHeader } from "./components/dashboard/project-header/ProjectHeader";
import PageContainer from "./components/layout/PageContainer";

function App() {
  return (
    <PageContainer>
      <ProjectHeader />
      <DataTablesSummary />
    </PageContainer>
  );
}

export default App;
