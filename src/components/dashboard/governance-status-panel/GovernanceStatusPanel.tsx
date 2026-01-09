import { ApprovalsList } from "./ApprovalsList";
import { ComplianceChecklist } from "./ComplianceChecklist";
import { StakeholderList } from "./StakeholderList";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";
import { useGovernance } from "../../../hooks/useGovernance";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { EmptyState } from "../../ui/EmptyState";
import { DashboardCard } from "../../layout/DashboardCard";
import { GovernanceStatusSkeleton } from "./GovernanceStatusSkeleton";

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
  if (!governance) return <EmptyState />;

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
