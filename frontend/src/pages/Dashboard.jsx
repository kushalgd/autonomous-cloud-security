import {
  ShieldAlert,
  AlertTriangle,
  Activity,
  CheckCircle,
  Zap,
} from "lucide-react";

import StatCard from "../components/StatCard";
import IncidentTable from "../components/IncidentTable";
import LiveActivity from "../components/LiveActivity";
import ThreatChart from "../components/ThreatChart";

function Dashboard({ incidents }) {

  const criticalCount = incidents.filter(
    (incident) =>
      incident.severity === "CRITICAL"
  ).length;

  const highCount = incidents.filter(
    (incident) =>
      incident.severity === "HIGH"
  ).length;

  const openCount = incidents.filter(
    (incident) =>
      incident.status === "OPEN"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) =>
      incident.status === "RESOLVED"
  ).length;


  return (

    <div className="dashboard-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            SECURITY OVERVIEW
          </div>

          <h1>
            Command Center
          </h1>

          <p>
            Real-time cloud security intelligence
            powered by AutoSEC AI.
          </p>

        </div>


        <div className="live-indicator">

          <span></span>

          LIVE MONITORING

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <section className="stats-grid">

        <StatCard
          title="Total Incidents"
          value={incidents.length}
          subtitle="Live"
          icon={Activity}
          variant="blue"
        />

        <StatCard
          title="Critical Threats"
          value={criticalCount}
          subtitle="Detected"
          icon={ShieldAlert}
          variant="red"
        />

        <StatCard
          title="High Threats"
          value={highCount}
          subtitle="Detected"
          icon={AlertTriangle}
          variant="orange"
        />

        <StatCard
          title="Open Incidents"
          value={openCount}
          subtitle="Active"
          icon={Zap}
          variant="yellow"
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
          subtitle="Completed"
          icon={CheckCircle}
          variant="green"
        />

      </section>


      {/* =========================
          SECURITY OPERATIONS
      ========================= */}

      <section className="operations-grid">


        <div className="threat-overview">

          <div className="panel-header">

            <div>

              <div className="panel-eyebrow">
                THREAT INTELLIGENCE
              </div>

              <h2>
                Threat Overview
              </h2>

              <p>
                Current security posture across
                monitored AWS resources.
              </p>

            </div>

            <div className="security-score">

              <span>
                SECURITY SCORE
              </span>

              <strong>
                {incidents.length > 0
                  ? "ACTIVE"
                  : "SECURE"}
              </strong>

            </div>

          </div>


          <div className="threat-metrics">

            <div className="threat-metric critical">

              <div>
                Critical
              </div>

              <strong>
                {criticalCount}
              </strong>

              <span>
                Requires attention
              </span>

            </div>


            <div className="threat-metric high">

              <div>
                High
              </div>

              <strong>
                {highCount}
              </strong>

              <span>
                Elevated risk
              </span>

            </div>


            <div className="threat-metric open">

              <div>
                Active
              </div>

              <strong>
                {openCount}
              </strong>

              <span>
                Open incidents
              </span>

            </div>

          </div>


          <div className="threat-bar">

            <div
              style={{
                width: `${
                  incidents.length
                    ? Math.min(
                        (criticalCount /
                          incidents.length) *
                          100,
                        100
                      )
                    : 0
                }%`,
              }}
            />

          </div>


          <div className="threat-bar-label">

            <span>
              Critical threat ratio
            </span>

            <span>
              {incidents.length
                ? Math.round(
                    (criticalCount /
                      incidents.length) *
                      100
                  )
                : 0}
              %
            </span>

          </div>

        </div>


        <LiveActivity
          incidents={incidents}
        />

      </section>
      {/* =========================
    THREAT DISTRIBUTION
========================= */}

<section className="dashboard-chart-grid">

  <ThreatChart
    incidents={incidents}
  />

  <div className="dashboard-insight-panel">

    <div className="panel-eyebrow">
      SECURITY INTELLIGENCE
    </div>

    <h2>
      Current Security Posture
    </h2>

    <p>
      AutoSEC AI continuously analyzes cloud
      activity and identifies potentially
      malicious behavior.
    </p>

    <div className="insight-list">

      <div className="insight-item">

        <span className="insight-dot critical-dot"></span>

        <div>
          <strong>
            Critical threats
          </strong>

          <small>
            {criticalCount} requiring immediate
            attention
          </small>
        </div>

      </div>


      <div className="insight-item">

        <span className="insight-dot high-dot"></span>

        <div>
          <strong>
            Elevated threats
          </strong>

          <small>
            {highCount} high-severity events
          </small>
        </div>

      </div>


      <div className="insight-item">

        <span className="insight-dot active-dot"></span>

        <div>
          <strong>
            Active incidents
          </strong>

          <small>
            {openCount} incidents currently open
          </small>
        </div>

      </div>

    </div>

  </div>

</section>


      {/* =========================
          INCIDENT TABLE
      ========================= */}

      <IncidentTable
        incidents={incidents}
      />


      {/* =========================
          SYSTEM STATUS
      ========================= */}

      <section className="welcome-panel">

        <div className="welcome-icon">
          <ShieldAlert size={30} />
        </div>

        <div>

          <h2>
            AutoSEC AI Security Operations Center
          </h2>

          <p>
            Your autonomous cloud security system
            is monitoring AWS activity, analyzing
            threats with AI, and preparing
            self-healing responses.
          </p>

        </div>

        <div className="system-ready">

          <span></span>

          SYSTEM READY

        </div>

      </section>

    </div>
  );
}

export default Dashboard;