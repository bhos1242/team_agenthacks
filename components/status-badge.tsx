import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "confirmed" | "pending" | "cancelled" | "completed" | "active" | "inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  confirmed: { label: "Confirmed", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  completed: { label: "Completed", variant: "outline" },
  active: { label: "Active", variant: "default" },
  inactive: { label: "Inactive", variant: "secondary" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn("capitalize", className)}>
      {config.label}
    </Badge>
  );
}
