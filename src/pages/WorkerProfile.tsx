import { useParams, Link } from "react-router";
import { ArrowLeft, MapPin, Shield, Clock, AlertTriangle, Phone, Mail } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const workerData = {
  "W-1234": {
    name: "Sarah Mitchell",
    id: "W-1234",
    role: "Senior Technician",
    department: "Assembly",
    safetyScore: 92,
    status: "On Duty",
    currentZone: "Assembly Line A",
    shiftStart: "06:00 AM",
    shiftEnd: "02:00 PM",
    phone: "+1 (555) 123-4567",
    email: "sarah.mitchell@factory.com",
    certifications: ["Forklift Operation", "Heavy Machinery", "First Aid"],
    incidentHistory: [
      { month: "Aug", count: 0 },
      { month: "Sep", count: 1 },
      { month: "Oct", count: 0 },
      { month: "Nov", count: 0 },
      { month: "Dec", count: 2 },
      { month: "Jan", count: 0 },
    ],
    recentIncidents: [
      {
        id: "INC-2024-001",
        date: "2026-02-13",
        type: "Equipment Failure",
        severity: "Critical",
        status: "Resolved",
      },
      {
        id: "INC-2023-089",
        date: "2025-12-15",
        type: "Minor Incident",
        severity: "Low",
        status: "Resolved",
      },
    ],
  },
  "W-5678": {
    name: "Michael Chen",
    id: "W-5678",
    role: "Warehouse Operator",
    department: "Logistics",
    safetyScore: 78,
    status: "On Duty",
    currentZone: "Warehouse B",
    shiftStart: "08:00 AM",
    shiftEnd: "04:00 PM",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@factory.com",
    certifications: ["Warehouse Safety", "Loading Equipment"],
    incidentHistory: [
      { month: "Aug", count: 1 },
      { month: "Sep", count: 2 },
      { month: "Oct", count: 1 },
      { month: "Nov", count: 3 },
      { month: "Dec", count: 1 },
      { month: "Jan", count: 2 },
    ],
    recentIncidents: [
      {
        id: "INC-2024-002",
        date: "2026-02-13",
        type: "Safety Violation",
        severity: "Warning",
        status: "Pending",
      },
    ],
  },
};

export default function WorkerProfile() {
  const { id } = useParams();
  const worker = workerData[id as keyof typeof workerData];

  if (!worker) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-foreground mb-2">Worker Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested worker profile does not exist.</p>
          <Link to="/worker-tracking" className="text-primary hover:text-primary/80">
            Back to Worker Tracking
          </Link>
        </div>
      </div>
    );
  }

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  const getSafetyScoreBg = (score: number) => {
    if (score >= 90) return "bg-success";
    if (score >= 70) return "bg-primary";
    return "bg-destructive";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-destructive";
      case "Warning":
        return "text-primary";
      case "Low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-success/10 text-success border-success";
      case "Pending":
        return "bg-primary/10 text-primary border-primary";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/worker-tracking"
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-foreground mb-1">Worker Profile</h1>
            <p className="text-muted-foreground">Detailed information and safety records</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Main Profile Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          {/* Worker Card */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary">
                  {worker.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h2 className="text-foreground mb-1">{worker.name}</h2>
              <p className="text-sm text-muted-foreground mb-1">{worker.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{worker.id}</p>
              <div className="w-full pt-4 border-t border-border">
                <div className="flex items-center justify-center mb-2">
                  <Shield className={`w-8 h-8 ${getSafetyScoreColor(worker.safetyScore)}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Safety Score</p>
                <p className={`text-3xl font-bold ${getSafetyScoreColor(worker.safetyScore)}`}>
                  {worker.safetyScore}
                </p>
                <div className="w-full bg-secondary rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${getSafetyScoreBg(worker.safetyScore)}`}
                    style={{ width: `${worker.safetyScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-muted-foreground mr-3" />
                <span className="text-foreground">{worker.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-muted-foreground mr-3" />
                <span className="text-foreground">{worker.email}</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Certifications</h3>
            <div className="space-y-2">
              {worker.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 bg-success/10 rounded-lg border border-success/20"
                >
                  <Shield className="w-4 h-4 text-success mr-2" />
                  <span className="text-sm text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="col-span-2 space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <h4 className="text-foreground">Current Status</h4>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm text-success font-medium">{worker.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm text-foreground">{worker.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Shift</span>
                  <span className="text-sm text-foreground">{worker.shiftStart} - {worker.shiftEnd}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-primary mr-2" />
                <h4 className="text-foreground">Current Location</h4>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground mb-2">{worker.currentZone}</p>
                <p className="text-sm text-muted-foreground">Last updated: 2 min ago</p>
              </div>
            </div>
          </div>

          {/* Location Tracking Map Placeholder */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Location Tracking</h3>
            <div className="w-full h-64 bg-secondary/30 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Factory Floor Map</p>
                <p className="text-sm text-muted-foreground mt-1">Real-time location tracking visualization</p>
              </div>
            </div>
          </div>

          {/* Incident History Chart */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-foreground mb-4">Incident History (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={worker.incidentHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "0.5rem",
                    color: "#0F172A",
                  }}
                />
                <Bar dataKey="count" fill="#FACC15" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Incidents */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Recent Incidents</h3>
              <Link to="/incident-reports" className="text-sm text-primary hover:text-primary/80">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {worker.recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <AlertTriangle className={`w-5 h-5 ${getSeverityColor(incident.severity)}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{incident.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{incident.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{incident.date}</p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getStatusColor(
                          incident.status
                        )}`}
                      >
                        {incident.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}