import type { ReactNode } from "react";
import { DashboardCard } from "../layout/DashboardCard";

interface EmptyStateProps {
  title: string;
  message?: string;
  headerRight?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  message = "No data available.",
  headerRight,
  className = "",
}: EmptyStateProps) {
  return (
    <DashboardCard title={title} headerRight={headerRight}>
      <div
        className={[
          "text-center text-slate-500 italic px-6 py-6 sm:py-8",
          className,
        ].join(" ")}
      >
        {message}
      </div>
    </DashboardCard>
  );
}
