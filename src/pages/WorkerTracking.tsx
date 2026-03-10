import { Link } from "react-router";
import { Search, Filter, MapPin, Shield, Clock } from "lucide-react";

const workers = [
  {
    id: "W-1234",
    name: "Sarah Mitchell",
    role: "Senior Technician",
    department: "Assembly",
    zone: "Assembly Line A",
    status: "On Duty",
    safetyScore: 92,
    shift: "Morning",
    lastSeen: "Active now",
  },
  {
    id: "W-5678",
    name: "Michael Chen",
    role: "Warehouse Operator",
    department: "Logistics",
    zone: "Warehouse B",
    status: "On Duty",
    safetyScore: 78,
    shift: "Morning",
    lastSeen: "Active now",
  },
  {
    id: "W-9012",
    name: "Jessica Rodriguez",
    role: "Quality Inspector",
    department: "Quality Control",
    zone: "Quality Control",
    status: "On Break",
    safetyScore: 95,
    shift: "Morning",
    lastSeen: "15 min ago",
  },
  {
    id: "W-3456",
    name: "David Thompson",
    role: "Machine Operator",
    department: "Production",
    zone: "Production Floor",
    status: "On Duty",
    safetyScore: 88,
    shift: "Morning",
    lastSeen: "Active now",
  },
  {
    id: "W-7890",
    name: "Emily Johnson",
    role: "Maintenance Tech",
    department: "Maintenance",
    zone: "Maintenance Bay",
    status: "On Duty",
    safetyScore: 91,
    shift: "Morning",
    lastSeen: "Active now",
  },
  {
    id: "W-2345",
    name: "Robert Lee",
    role: "Forklift Operator",
    department: "Logistics",
    zone: "Loading Dock",
    status: "Off Duty",
    safetyScore: 85,
    shift: "Evening",
    lastSeen: "2 hours ago",
  },
];

export default function WorkerTracking() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty":
        return "bg-success/10 text-success border-success";
      case "On Break":
        return "bg-primary/10 text-primary border-primary";
      case "Off Duty":
        return "bg-muted/10 text-muted-foreground border-muted";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Worker Tracking</h1>
          <p className="text-muted-foreground">Monitor all workers and their locations</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Add New Worker
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">Total Workers</p>
          <p className="text-3xl font-bold text-foreground">113</p>
          <p className="text-xs text-success mt-1">6 online now</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">On Duty</p>
          <p className="text-3xl font-bold text-success">85</p>
          <p className="text-xs text-muted-foreground mt-1">Morning shift</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">On Break</p>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground mt-1">Average: 15 min</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">Avg Safety Score</p>
          <p className="text-3xl font-bold text-success">88</p>
          <p className="text-xs text-success mt-1">+2 from last week</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, ID, or role..."
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
            <option>All Departments</option>
            <option>Assembly</option>
            <option>Logistics</option>
            <option>Production</option>
            <option>Maintenance</option>
            <option>Quality Control</option>
          </select>
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Status</option>
            <option>On Duty</option>
            <option>On Break</option>
            <option>Off Duty</option>
          </select>
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-2 gap-6">
        {workers.map((worker) => (
          <Link
            key={worker.id}
            to={`/worker/${worker.id}`}
            className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {worker.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold">{worker.name}</h4>
                  <p className="text-sm text-muted-foreground">{worker.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{worker.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                  worker.status
                )}`}
              >
                {worker.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                <div>
                  <p className="text-xs text-muted-foreground">Current Zone</p>
                  <p className="text-foreground">{worker.zone}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                <div>
                  <p className="text-xs text-muted-foreground">Shift</p>
                  <p className="text-foreground">{worker.shift}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center">
                <Shield className={`w-5 h-5 ${getSafetyScoreColor(worker.safetyScore)} mr-2`} />
                <div>
                  <p className="text-xs text-muted-foreground">Safety Score</p>
                  <p className={`text-sm font-bold ${getSafetyScoreColor(worker.safetyScore)}`}>
                    {worker.safetyScore}/100
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last Seen</p>
                <p className="text-sm text-foreground">{worker.lastSeen}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 6 of 113 workers
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
  );
}
