import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LiveMonitoring from "./pages/LiveMonitoring";
import WorkerTracking from "./pages/WorkerTracking";
import IncidentReports from "./pages/IncidentReports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import WorkerProfile from "./pages/WorkerProfile";
import MachineFailureAI from "./pages/MachineFailureAI";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "live-monitoring", Component: LiveMonitoring },
      { path: "worker-tracking", Component: WorkerTracking },
      { path: "incident-reports", Component: IncidentReports },
      { path: "analytics", Component: Analytics },
      { path: "machine-failure-ai", Component: MachineFailureAI },
      { path: "settings", Component: Settings },
      { path: "worker/:id", Component: WorkerProfile },
    ],
  },
]);