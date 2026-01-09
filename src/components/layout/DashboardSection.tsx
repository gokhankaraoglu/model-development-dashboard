import type { ReactNode } from "react";

export interface DashboardSectionProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function DashboardSection({
  children,
  fullWidth,
}: DashboardSectionProps) {
  return (
    <section className={fullWidth ? "col-span-2" : "col-span-1"}>
      {children}
    </section>
  );
}

export default DashboardSection;
