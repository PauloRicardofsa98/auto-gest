import { HTMLAttributes } from "react";

import { cn } from "@/app/_lib/utils";

interface DataTableColumnContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

export function DataTableColumnContent({
  className,
  align = "center",
  children,
}: DataTableColumnContentProps) {
  return (
    <div
      className={cn(`flex items-center justify-${align} truncate`, className)}
    >
      {children}
    </div>
  );
}

export default DataTableColumnContent;
