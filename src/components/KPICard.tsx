import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export default function KPICard({ title, value, change, trend, icon: Icon, iconColor }: KPICardProps) {
  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-lg backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          {change && (
            <p className={`text-sm ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${iconColor || "bg-primary/10"} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor ? "" : "text-primary"}`} />
        </div>
      </div>
    </div>
  );
}
