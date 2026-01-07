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
  contentClassName = "",
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
      <div className={[widthClasses, "flex flex-col gap-6"].join(" ")}>
        <main
          className={[
            "flex-1",
            "p-4 sm:p-6 lg:p-8",
            "overflow-hidden",
            contentClassName,
          ].join(" ")}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default PageContainer;
