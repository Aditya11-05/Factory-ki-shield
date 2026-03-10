import { Radio, MapPin, AlertCircle } from "lucide-react";

const liveWorkers = [
  { id: "W-1234", name: "Sarah Mitchell", zone: "Assembly Line A", status: "active", heartRate: 78, temp: 36.5 },
  { id: "W-5678", name: "Michael Chen", zone: "Warehouse B", status: "warning", heartRate: 102, temp: 37.2 },
  { id: "W-9012", name: "Jessica Rodriguez", zone: "Packaging Zone", status: "active", heartRate: 72, temp: 36.4 },
  { id: "W-3456", name: "David Thompson", zone: "Production Floor", status: "alert", heartRate: 115, temp: 38.1 },
  { id: "W-7890", name: "Emily Johnson", zone: "Maintenance Bay", status: "active", heartRate: 80, temp: 36.6 },
  { id: "W-2345", name: "Robert Lee", zone: "Loading Dock", status: "active", heartRate: 75, temp: 36.3 },
];

const liveAlerts = [
  { id: 1, zone: "Assembly Line A", message: "Temperature threshold exceeded", severity: "critical", time: "Just now" },
  { id: 2, zone: "Warehouse B", message: "Worker vitals showing elevated heart rate", severity: "warning", time: "2 min ago" },
  { id: 3, zone: "Production Floor", message: "Machinery vibration levels high", severity: "critical", time: "5 min ago" },
  { id: 4, zone: "Loading Dock", message: "Unauthorized access attempt", severity: "warning", time: "8 min ago" },
];

export default function LiveMonitoring() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "warning":
        return "bg-primary";
      case "alert":
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
      default:
        return "bg-muted/10 border-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Live Monitoring</h1>
          <p className="text-muted-foreground">Real-time worker and zone monitoring</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg border border-success">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-sm text-success font-medium">LIVE</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Workers</p>
              <p className="text-2xl font-bold text-foreground">4</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Radio className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Warnings</p>
              <p className="text-2xl font-bold text-primary">1</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
              <p className="text-2xl font-bold text-destructive">1</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Zones</p>
              <p className="text-2xl font-bold text-foreground">6</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Worker Vitals */}
        <div className="col-span-2 bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Worker Vitals Monitor</h3>
          <div className="space-y-4">
            {liveWorkers.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:bg-background/70 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(worker.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{worker.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {worker.zone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Heart Rate</p>
                    <p className={`text-sm font-semibold ${
                      worker.heartRate > 100 ? "text-destructive" : worker.heartRate > 90 ? "text-primary" : "text-success"
                    }`}>
                      {worker.heartRate} bpm
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Temp</p>
                    <p className={`text-sm font-semibold ${
                      worker.temp > 37.5 ? "text-destructive" : worker.temp > 37 ? "text-primary" : "text-success"
                    }`}>
                      {worker.temp}°C
                    </p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Live Alerts</h3>
          <div className="space-y-3">
            {liveAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityStyles(alert.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold uppercase">{alert.severity}</span>
                  <span className="text-xs opacity-70">{alert.time}</span>
                </div>
                <p className="text-sm font-medium mb-1">{alert.message}</p>
                <div className="flex items-center text-xs opacity-70">
                  <MapPin className="w-3 h-3 mr-1" />
                  {alert.zone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factory Floor Map */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
        <h3 className="text-foreground mb-4">Factory Floor Map - Live Positions</h3>
        <div className="w-full h-96 bg-secondary/30 rounded-lg flex items-center justify-center border border-border">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium">Interactive Factory Map</p>
            <p className="text-sm text-muted-foreground mt-2">
              Real-time worker positioning and zone visualization
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-xs text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                <span className="text-xs text-muted-foreground">Alert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
