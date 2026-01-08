import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
};

export function PageContainer({
  children,
  fullWidth = false,
  className = "",
}: PageContainerProps) {
  const widthClasses = fullWidth ? "w-full" : "max-w-7xl w-full";

  return (
    <div
      className={[
        "min-h-screen bg-slate-50 text-slate-900",
        "flex justify-center",
        "px-4 sm:px-6 lg:px-8 py-6 lg:py-8",
        className,
      ].join(" ")}
    >
      <div className={[widthClasses].join(" ")}>
        <main className="grid grid-cols-2 gap-6 items-start">{children}</main>
      </div>
    </div>
  );
}

export default PageContainer;
