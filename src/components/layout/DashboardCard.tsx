import type { ReactNode } from "react";

export interface DashboardCardProps {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  children,
  headerRight,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 ${className}`}
    >
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {headerRight && (
          <div className="ml-4 shrink-0 text-sm text-gray-600">
            {headerRight}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}

export default DashboardCard;
