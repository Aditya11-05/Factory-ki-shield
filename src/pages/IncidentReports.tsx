import { Link } from "react-router";
import { Search, Filter, Download } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-001",
    date: "2026-02-13",
    time: "14:32",
    worker: "Sarah Mitchell",
    workerId: "W-1234",
    type: "Equipment Failure",
    zone: "Assembly Line A",
    severity: "Critical",
    status: "Resolved",
    description: "Conveyor belt malfunction caused temporary halt",
  },
  {
    id: "INC-2024-002",
    date: "2026-02-13",
    time: "10:15",
    worker: "Michael Chen",
    workerId: "W-5678",
    type: "Safety Violation",
    zone: "Warehouse B",
    severity: "Warning",
    status: "Pending",
    description: "Worker entered zone without proper PPE",
  },
  {
    id: "INC-2024-003",
    date: "2026-02-12",
    time: "16:45",
    worker: "Jessica Rodriguez",
    workerId: "W-9012",
    type: "Minor Incident",
    zone: "Packaging Zone",
    severity: "Low",
    status: "Resolved",
    description: "Minor equipment adjustment needed",
  },
  {
    id: "INC-2024-004",
    date: "2026-02-12",
    time: "09:20",
    worker: "David Thompson",
    workerId: "W-3456",
    type: "Environmental",
    zone: "Production Floor",
    severity: "Critical",
    status: "Pending",
    description: "Temperature threshold exceeded in zone",
  },
  {
    id: "INC-2024-005",
    date: "2026-02-11",
    time: "13:10",
    worker: "Emily Johnson",
    workerId: "W-7890",
    type: "Equipment Failure",
    zone: "Maintenance Bay",
    severity: "Warning",
    status: "Resolved",
    description: "Hydraulic system pressure drop detected",
  },
  {
    id: "INC-2024-006",
    date: "2026-02-11",
    time: "11:55",
    worker: "Robert Lee",
    workerId: "W-2345",
    type: "Safety Violation",
    zone: "Loading Dock",
    severity: "Warning",
    status: "Critical",
    description: "Forklift operation without certification",
  },
];

export default function IncidentReports() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-success/10 text-success border-success";
      case "Pending":
        return "bg-primary/10 text-primary border-primary";
      case "Critical":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Incident Reports</h1>
          <p className="text-muted-foreground">View and manage all safety incidents</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Status</option>
            <option>Resolved</option>
            <option>Pending</option>
            <option>Critical</option>
          </select>
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Severity</option>
            <option>Critical</option>
            <option>Warning</option>
            <option>Low</option>
          </select>
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Incident ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Worker</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Zone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary">{incident.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div>{incident.date}</div>
                    <div className="text-xs">{incident.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <Link 
                      to={`/worker/${incident.workerId}`}
                      className="hover:text-primary transition-colors"
                    >
                      <div>{incident.worker}</div>
                      <div className="text-xs text-muted-foreground">{incident.workerId}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{incident.type}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{incident.zone}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1 to 6 of 47 incidents
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors">
              2
            </button>
            <button className="px-3 py-1 text-sm bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors">
              3
            </button>
            <button className="px-3 py-1 text-sm bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
