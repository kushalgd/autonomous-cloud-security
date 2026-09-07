import {
  Terminal,
  ShieldAlert,
  Activity,
  Clock3,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Zap,
  Radio,
  Database,
} from "lucide-react";

import { useMemo, useState } from "react";

function SecurityLogs({ incidents = [] }) {

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  /* ---------------------------------
     FORMAT DATE
  --------------------------------- */

  const formatTime = (date) => {

    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  /* ---------------------------------
     FILTER INCIDENTS
  --------------------------------- */

  const filteredIncidents = useMemo(() => {

    const normalizedSearch =
      search.trim().toLowerCase();

    return incidents.filter((incident) => {

      const threat =
        incident.threat?.toLowerCase() || "";

      const sourceIP =
        incident.source_ip?.toLowerCase() || "";

      const description =
        incident.description?.toLowerCase() || "";

      const action =
        incident.action_taken?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        threat.includes(normalizedSearch) ||
        sourceIP.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        action.includes(normalizedSearch);

      const matchesSeverity =
        severity === "ALL" ||
        incident.severity === severity;

      const matchesStatus =
        status === "ALL" ||
        incident.status === status;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );

    });

  }, [
    incidents,
    search,
    severity,
    status,
  ]);


  /* ---------------------------------
     SUMMARY COUNTS
  --------------------------------- */

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


  /* ---------------------------------
     SEVERITY ICON
  --------------------------------- */

  const getSeverityIcon = (level) => {

    switch (level) {

      case "CRITICAL":
        return ShieldAlert;

      case "HIGH":
        return AlertTriangle;

      case "MEDIUM":
        return Activity;

      default:
        return Activity;

    }

  };


  /* ---------------------------------
     SEVERITY CLASS
  --------------------------------- */

  const getSeverityClass = (level) => {

    switch (level) {

      case "CRITICAL":
        return "log-critical";

      case "HIGH":
        return "log-high";

      case "MEDIUM":
        return "log-medium";

      default:
        return "log-low";

    }

  };


  /* ---------------------------------
     STATUS CLASS
  --------------------------------- */

  const getStatusClass = (incidentStatus) => {

    if (incidentStatus === "RESOLVED") {
      return "log-status-resolved";
    }

    return "log-status-open";

  };


  return (

    <div className="security-logs-page">


      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            SECURITY TELEMETRY
          </div>

          <h1>
            Security Logs
          </h1>

          <p>
            Security events processed by the
            AutoSEC AI monitoring pipeline.
          </p>

        </div>


        <div className="logs-live-status">

          <span></span>

          LOG STREAM ACTIVE

        </div>

      </div>


      {/* =================================
          EVENT CONSOLE BANNER
      ================================= */}

      <section className="logs-terminal-banner">

        <div className="terminal-icon">
          <Terminal size={23} />
        </div>


        <div className="terminal-info">

          <strong>
            AutoSEC AI Event Console
          </strong>

          <span>
            Monitoring, classifying and tracking
            cloud security events.
          </span>

        </div>


        <div className="terminal-stream">

          <Radio size={15} />

          <span>
            LIVE STREAM
          </span>

        </div>


        <div className="terminal-count">

          <strong>
            {incidents.length}
          </strong>

          <span>
            EVENTS
          </span>

        </div>

      </section>


      {/* =================================
          LOG SUMMARY
      ================================= */}

      <section className="logs-summary-grid">


        <div className="logs-summary-card">

          <div className="logs-summary-icon total">
            <Database size={19} />
          </div>

          <div>

            <span>
              TOTAL EVENTS
            </span>

            <strong>
              {incidents.length}
            </strong>

            <small>
              Recorded security events
            </small>

          </div>

        </div>


        <div className="logs-summary-card">

          <div className="logs-summary-icon critical">
            <ShieldAlert size={19} />
          </div>

          <div>

            <span>
              CRITICAL
            </span>

            <strong>
              {criticalCount}
            </strong>

            <small>
              High-priority events
            </small>

          </div>

        </div>


        <div className="logs-summary-card">

          <div className="logs-summary-icon high">
            <AlertTriangle size={19} />
          </div>

          <div>

            <span>
              HIGH
            </span>

            <strong>
              {highCount}
            </strong>

            <small>
              Elevated security events
            </small>

          </div>

        </div>


        <div className="logs-summary-card">

          <div className="logs-summary-icon active">
            <Zap size={19} />
          </div>

          <div>

            <span>
              ACTIVE
            </span>

            <strong>
              {openCount}
            </strong>

            <small>
              Open incidents
            </small>

          </div>

        </div>


        <div className="logs-summary-card">

          <div className="logs-summary-icon resolved">
            <CheckCircle2 size={19} />
          </div>

          <div>

            <span>
              RESOLVED
            </span>

            <strong>
              {resolvedCount}
            </strong>

            <small>
              Completed incidents
            </small>

          </div>

        </div>


      </section>


      {/* =================================
          FILTER CONTROLS
      ================================= */}

      <section className="logs-controls">


        {/* SEARCH */}

        <div className="logs-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search threat, IP, description or action..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              className="logs-clear-search"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* SEVERITY */}

        <div className="logs-filter">

          <Filter size={14} />

          <select
            value={severity}
            onChange={(event) =>
              setSeverity(event.target.value)
            }
          >

            <option value="ALL">
              ALL SEVERITIES
            </option>

            <option value="CRITICAL">
              CRITICAL
            </option>

            <option value="HIGH">
              HIGH
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="LOW">
              LOW
            </option>

          </select>

        </div>


        {/* STATUS */}

        <div className="logs-filter">

          <Activity size={14} />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >

            <option value="ALL">
              ALL STATUS
            </option>

            <option value="OPEN">
              OPEN
            </option>

            <option value="RESOLVED">
              RESOLVED
            </option>

          </select>

        </div>


        {/* RESULT COUNT */}

        <div className="logs-result-count">

          <strong>
            {filteredIncidents.length}
          </strong>

          <span>
            MATCHED EVENTS
          </span>

        </div>

      </section>


      {/* =================================
          SECURITY LOG PANEL
      ================================= */}

      <section className="security-log-panel">


        {/* PANEL HEADER */}

        <div className="security-log-header">

          <div>

            <div className="panel-eyebrow">
              EVENT STREAM
            </div>

            <h2>
              Security Event Timeline
            </h2>

            <p>
              Chronological security activity
              received by AutoSEC AI.
            </p>

          </div>


          <div className="event-stream-status">

            <span></span>

            STREAMING

          </div>

        </div>


        {/* =================================
            EMPTY STATE
        ================================= */}

        {filteredIncidents.length === 0 ? (

          <div className="logs-empty">

            <div className="logs-empty-icon">
              <Terminal size={34} />
            </div>

            <h3>
              No matching events
            </h3>

            <p>
              No security events match the
              current search or filters.
            </p>

            {(search ||
              severity !== "ALL" ||
              status !== "ALL") && (

              <button
                className="logs-reset-button"
                onClick={() => {
                  setSearch("");
                  setSeverity("ALL");
                  setStatus("ALL");
                }}
              >
                Reset Filters
              </button>

            )}

          </div>

        ) : (


          /* =================================
             EVENT LIST
          ================================= */

          <div className="security-log-list">

            {filteredIncidents.map(
              (incident, index) => {

                const Icon =
                  getSeverityIcon(
                    incident.severity
                  );

                const severityClass =
                  getSeverityClass(
                    incident.severity
                  );

                const statusClass =
                  getStatusClass(
                    incident.status
                  );


                return (

                  <article
                    key={incident.id}
                    className={`security-log-entry ${severityClass}`}
                  >


                    {/* TIMELINE */}

                    <div className="log-timeline">

                      <div
                        className={`log-icon ${severityClass}`}
                      >
                        <Icon size={16} />
                      </div>

                      {index !==
                        filteredIncidents.length - 1 && (
                        <div className="timeline-line"></div>
                      )}

                    </div>


                    {/* EVENT CONTENT */}

                    <div className="log-event">


                      {/* EVENT HEADER */}

                      <div className="log-event-top">

                        <div>

                          <span className="log-event-type">
                            SECURITY EVENT
                          </span>

                          <h3>
                            {incident.threat ||
                              "Unknown Security Event"}
                          </h3>

                        </div>


                        <div className="log-event-badges">

                          <span
                            className={`log-severity ${severityClass}`}
                          >
                            {incident.severity ||
                              "LOW"}
                          </span>


                          <span
                            className={`log-status ${statusClass}`}
                          >

                            {incident.status ===
                            "RESOLVED" ? (
                              <CheckCircle2
                                size={12}
                              />
                            ) : (
                              <Clock3
                                size={12}
                              />
                            )}

                            {incident.status ||
                              "OPEN"}

                          </span>

                        </div>

                      </div>


                      {/* DESCRIPTION */}

                      <p className="log-description">

                        {incident.description ||
                          "Security event detected and processed by AutoSEC AI."}

                      </p>


                      {/* METADATA */}

                      <div className="log-metadata">


                        <div>

                          <Globe size={13} />

                          <span>
                            {incident.source_ip ||
                              "UNKNOWN SOURCE"}
                          </span>

                        </div>


                        <div>

                          <Clock3 size={13} />

                          <span>
                            {formatTime(
                              incident.created_at
                            )}
                          </span>

                        </div>


                        <div>

                          <Activity size={13} />

                          <span>
                            INCIDENT #
                            {incident.id}
                          </span>

                        </div>


                      </div>


                      {/* ACTION */}

                      <div className="log-action">

                        <div className="log-action-label">

                          <Zap size={13} />

                          <span>
                            RESPONSE ACTION
                          </span>

                        </div>


                        <strong>

                          {incident.action_taken ||
                            "NO ACTION RECORDED"}

                        </strong>

                      </div>


                      {/* AI STATUS */}

                      <div className="log-ai-status">

                        <div>

                          <ShieldAlert size={13} />

                          <span>
                            AI THREAT ANALYSIS
                          </span>

                        </div>

                        <strong>
                          PROCESSED
                        </strong>

                      </div>


                    </div>


                  </article>

                );

              }
            )}

          </div>

        )}

      </section>

    </div>

  );

}

export default SecurityLogs;