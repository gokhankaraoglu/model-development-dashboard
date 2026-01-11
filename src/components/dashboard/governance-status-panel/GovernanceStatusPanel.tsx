import { ApprovalsList } from "./ApprovalsList";
import { ComplianceChecklist } from "./ComplianceChecklist";
import { StakeholderList } from "./StakeholderList";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";
import { GovernanceStatusSkeleton } from "./GovernanceStatusSkeleton";
import { useGovernance } from "../../../hooks";
import { EmptyState, ErrorMessage } from "../../ui";
import { DashboardCard } from "../../layout";

export const GovernanceStatusPanel = () => {
  const currentProjectId = useAppSelector(selectedProjectId);
  const {
    data: governance,
    loading,
    error,
    refetch,
  } = useGovernance(currentProjectId);

  if (loading) return <GovernanceStatusSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!governance)
    return (
      <EmptyState
        title="Governance overview"
        message="No governance data available for this project."
      />
    );

  return (
    <DashboardCard title="Governance overview">
      <ApprovalsList approvals={governance.approvals} />

      {governance.compliance_checklist && (
        <ComplianceChecklist checklist={governance.compliance_checklist} />
      )}

      <StakeholderList stakeholders={governance.stakeholders} />
    </DashboardCard>
  );
};
