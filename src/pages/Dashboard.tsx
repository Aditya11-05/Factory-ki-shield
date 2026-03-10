import { Users, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import KPICard from "../components/KPICard";

// Mock data
const safetyIncidentsData = [
  { time: "00:00", incidents: 2 },
  { time: "04:00", incidents: 1 },
  { time: "08:00", incidents: 5 },
  { time: "12:00", incidents: 3 },
  { time: "16:00", incidents: 7 },
  { time: "20:00", incidents: 4 },
  { time: "23:59", incidents: 2 },
];

const alertTypesData = [
  { name: "Equipment Failure", value: 35, color: "#EF4444" },
  { name: "Safety Violation", value: 28, color: "#FACC15" },
  { name: "Environmental", value: 20, color: "#3B82F6" },
  { name: "Minor Incidents", value: 17, color: "#22C55E" },
];

const liveAlerts = [
  { id: 1, type: "Critical", message: "Worker safety gear not detected - Zone A", time: "2 min ago", severity: "critical" },
  { id: 2, type: "Warning", message: "Machine temperature exceeding threshold", time: "5 min ago", severity: "warning" },
  { id: 3, type: "Info", message: "Scheduled maintenance due for Conveyor Belt 3", time: "12 min ago", severity: "info" },
  { id: 4, type: "Critical", message: "Gas leak detected in Storage Area B", time: "15 min ago", severity: "critical" },
  { id: 5, type: "Warning", message: "Worker entering restricted zone without authorization", time: "23 min ago", severity: "warning" },
  { id: 6, type: "Info", message: "Shift change completed successfully", time: "35 min ago", severity: "info" },
];

const factoryZones = [
  { id: 1, name: "Assembly Line A", status: "safe", workers: 24 },
  { id: 2, name: "Warehouse B", status: "safe", workers: 12 },
  { id: 3, name: "Quality Control", status: "warning", workers: 8 },
  { id: 4, name: "Packaging Zone", status: "safe", workers: 16 },
  { id: 5, name: "Maintenance Bay", status: "critical", workers: 5 },
  { id: 6, name: "Loading Dock", status: "safe", workers: 10 },
  { id: 7, name: "Storage Area A", status: "safe", workers: 6 },
  { id: 8, name: "Production Floor", status: "warning", workers: 32 },
];

export default function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-success";
      case "warning":
        return "bg-primary";
      case "critical":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 border-destructive text-destructive";
      case "warning":
        return "bg-primary/10 border-primary text-primary";
      case "info":
        return "bg-blue-500/10 border-blue-500 text-blue-400";
      default:
        return "bg-muted/10 border-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of factory safety and operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="Total Workers"
          value={113}
          change="+5 from yesterday"
          trend="up"
          icon={Users}
          iconColor="bg-blue-500/10 text-blue-400"
        />
        <KPICard
          title="Active Alerts"
          value={8}
          change="+2 from last hour"
          trend="up"
          icon={AlertTriangle}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Safe Zones"
          value="6/8"
          change="75% compliance"
          trend="neutral"
          icon={ShieldCheck}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Machine Status"
          value="94%"
          change="Operational"
          trend="up"
          icon={Activity}
          iconColor="bg-purple-500/10 text-purple-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="col-span-2 bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Safety Incidents Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={safetyIncidentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "0.5rem",
                  color: "#F8FAFC",
                }}
              />
              <Line type="monotone" dataKey="incidents" stroke="#FACC15" strokeWidth={3} dot={{ fill: "#FACC15", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Alert Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {alertTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "0.5rem",
                  color: "#0F172A",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {alertTypesData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-foreground font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Live Alerts Panel */}
        <div className="col-span-2 bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Live Alerts</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {liveAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityStyles(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-semibold text-sm">{alert.type}</span>
                      <span className="ml-2 text-xs opacity-70">{alert.time}</span>
                    </div>
                    <p className="text-sm opacity-90">{alert.message}</p>
                  </div>
                  <button className="ml-4 px-3 py-1 text-xs rounded-md bg-background/50 hover:bg-background transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Zone Status */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Factory Zone Status</h3>
          <div className="space-y-3">
            {factoryZones.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center flex-1">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)} mr-3`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">{zone.workers} workers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}