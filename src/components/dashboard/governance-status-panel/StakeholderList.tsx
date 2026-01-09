import type { Stakeholder } from "../../../types";

interface StakeholderListProps {
  stakeholders: Stakeholder[];
}

const getStakeholderIcon = (role: string) => {
  switch (role.toLowerCase()) {
    case "business owner":
      return "👔";
    case "governance manager":
      return "🛡️";
    case "developer":
      return "👨‍💻";
    case "validation manager":
      return "✓";
    case "risk manager":
      return "⚖️";
    default:
      return "👤";
  }
};

export function StakeholderList({ stakeholders }: StakeholderListProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Stakeholders</h3>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {stakeholders.length} total
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {stakeholders.map((stakeholder) => (
          <div
            key={stakeholder.user_id}
            className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-base">
              {getStakeholderIcon(stakeholder.role)}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {stakeholder?.name}
              </span>
              <span className="text-xs text-gray-500">{stakeholder?.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StakeholderList;
