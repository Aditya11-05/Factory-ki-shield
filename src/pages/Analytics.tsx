import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data
const monthlyIncidents = [
  { month: "Jan", total: 12, critical: 3, warning: 6, minor: 3 },
  { month: "Feb", total: 8, critical: 2, warning: 4, minor: 2 },
  { month: "Mar", total: 15, critical: 4, warning: 7, minor: 4 },
  { month: "Apr", total: 10, critical: 2, warning: 5, minor: 3 },
  { month: "May", total: 7, critical: 1, warning: 4, minor: 2 },
  { month: "Jun", total: 11, critical: 3, warning: 5, minor: 3 },
];

const departmentSafety = [
  { department: "Assembly", score: 92 },
  { department: "Logistics", score: 85 },
  { department: "Production", score: 88 },
  { department: "Maintenance", score: 90 },
  { department: "Quality", score: 95 },
  { department: "Packaging", score: 87 },
];

const weeklyCompliance = [
  { day: "Mon", compliance: 94 },
  { day: "Tue", compliance: 96 },
  { day: "Wed", compliance: 92 },
  { day: "Thu", compliance: 95 },
  { day: "Fri", compliance: 91 },
  { day: "Sat", compliance: 93 },
  { day: "Sun", compliance: 97 },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive safety and performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Total Incidents</p>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">63</p>
          <div className="flex items-center text-sm text-destructive">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8% vs last month</span>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Safety Score</p>
            <Activity className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">91.2</p>
          <div className="flex items-center text-sm text-success">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+3.2% improvement</span>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">4.2m</p>
          <div className="flex items-center text-sm text-success">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span>-12% faster</span>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Critical Alerts</p>
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">15</p>
          <div className="flex items-center text-sm text-success">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span>-20% reduction</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Incidents */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Monthly Incident Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyIncidents}>
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
              <Legend />
              <Bar dataKey="critical" stackId="a" fill="#EF4444" name="Critical" />
              <Bar dataKey="warning" stackId="a" fill="#FACC15" name="Warning" />
              <Bar dataKey="minor" stackId="a" fill="#22C55E" name="Minor" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Safety Scores */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Department Safety Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentSafety} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" stroke="#64748B" domain={[0, 100]} />
              <YAxis dataKey="department" type="category" stroke="#64748B" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "0.5rem",
                  color: "#0F172A",
                }}
              />
              <Bar dataKey="score" fill="#FACC15" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Compliance */}
        <div className="col-span-2 bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Weekly Compliance Rate (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyCompliance}>
              <defs>
                <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" domain={[85, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "0.5rem",
                  color: "#0F172A",
                }}
              />
              <Area
                type="monotone"
                dataKey="compliance"
                stroke="#FACC15"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCompliance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Insights */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h3 className="text-foreground mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <p className="text-xs text-success font-semibold mb-1">POSITIVE TREND</p>
              <p className="text-sm text-foreground">Quality Control maintains highest safety score</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-primary font-semibold mb-1">ATTENTION NEEDED</p>
              <p className="text-sm text-foreground">Logistics department needs additional training</p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-xs text-destructive font-semibold mb-1">ALERT</p>
              <p className="text-sm text-foreground">Equipment failure incidents increased 15%</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-xs text-blue-400 font-semibold mb-1">GOAL MET</p>
              <p className="text-sm text-foreground">Response time target achieved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h4 className="text-sm text-muted-foreground mb-4">Most Common Incident Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Equipment Failure</span>
              <span className="text-sm font-semibold text-destructive">35%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-destructive h-2 rounded-full" style={{ width: "35%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Safety Violation</span>
              <span className="text-sm font-semibold text-primary">28%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Environmental</span>
              <span className="text-sm font-semibold text-blue-400">20%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h4 className="text-sm text-muted-foreground mb-4">Peak Incident Hours</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">10:00 AM - 12:00 PM</span>
              <span className="text-sm font-semibold text-destructive">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">02:00 PM - 04:00 PM</span>
              <span className="text-sm font-semibold text-primary">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">06:00 PM - 08:00 PM</span>
              <span className="text-sm font-semibold text-primary">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">08:00 AM - 10:00 AM</span>
              <span className="text-sm font-semibold text-success">12</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
          <h4 className="text-sm text-muted-foreground mb-4">Resolution Status</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Resolved</span>
                <span className="text-sm font-semibold text-success">78%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">In Progress</span>
                <span className="text-sm font-semibold text-primary">15%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Pending</span>
                <span className="text-sm font-semibold text-destructive">7%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: "7%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}