import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import IncidentTable from "./components/IncidentTable";

import Dashboard from "./pages/Dashboard";
import LiveThreats from "./pages/LiveThreats";
import AWSCloud from "./pages/AWSCloud";
import AIAnalysis from "./pages/AIAnalysis";
import SelfHealing from "./pages/SelfHealing";
import SecurityLogs from "./pages/SecurityLogs";
import Settings from "./pages/Settings";

import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  // ---------------------------------------
  // Fetch incidents from FastAPI
  // ---------------------------------------
  const fetchIncidents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/incidents/`
      );

      setIncidents(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch incidents:",
        error
      );
    }
  };

  // ---------------------------------------
  // Initial fetch + automatic refresh
  // ---------------------------------------
  useEffect(() => {
    fetchIncidents();

    const interval = setInterval(
      fetchIncidents,
      5000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ---------------------------------------
  // Render
  // ---------------------------------------
  return (
    <div className="app">

      {/* ================================
          SIDEBAR
      ================================= */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* ================================
          MAIN AREA
      ================================= */}
      <div
        className={`main-area ${
          collapsed ? "sidebar-collapsed" : ""
        }`}
      >

        {/* TOPBAR */}
        <Topbar />

        {/* ================================
            PAGE CONTENT
        ================================= */}
        <main className="main-content">

          {/* =================================
              OVERVIEW
          ================================= */}
          {activePage === "Overview" && (
            <Dashboard
              incidents={incidents}
            />
          )}

          {/* =================================
              INCIDENTS
          ================================= */}
          {activePage === "Incidents" && (
            <IncidentTable
              incidents={incidents}
              onIncidentUpdated={
                fetchIncidents
              }
            />
          )}

          {/* =================================
              LIVE THREATS
          ================================= */}
          {activePage === "Live Threats" && (
            <LiveThreats
              incidents={incidents}
            />
          )}

          {/* =================================
              AWS CLOUD
          ================================= */}
          {activePage === "AWS Cloud" && (
            <AWSCloud
              incidents={incidents}
            />
          )}

          {/* =================================
              AI ANALYSIS
          ================================= */}
          {activePage === "AI Analysis" && (
            <AIAnalysis
              incidents={incidents}
            />
          )}

          {/* =================================
              SELF-HEALING
          ================================= */}
          {activePage === "Self-Healing" && (
            <SelfHealing
              incidents={incidents}
            />
          )}

          {/* =================================
              SECURITY LOGS
          ================================= */}
          {activePage === "Security Logs" && (
            <SecurityLogs
              incidents={incidents}
            />
          )}

          {/* =================================
              SETTINGS
          ================================= */}
          {activePage === "Settings" && (
            <Settings />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;