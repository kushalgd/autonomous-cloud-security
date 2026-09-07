import {
  ShieldAlert,
  Activity,
  Globe,
  Zap,
  Clock3,
  AlertTriangle,
  Radio,
  Bot,
  Fingerprint,
  ShieldCheck,
  Server,
} from "lucide-react";

function LiveThreats({ incidents = [] }) {

  const activeThreats = incidents.filter(
    (incident) =>
      incident.status !== "RESOLVED"
  );

  const criticalThreats = activeThreats.filter(
    (incident) =>
      incident.severity === "CRITICAL"
  );

  const highThreats = activeThreats.filter(
    (incident) =>
      incident.severity === "HIGH"
  );

  const mediumThreats = activeThreats.filter(
    (incident) =>
      incident.severity === "MEDIUM"
  );

  const formatTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const severityClass = (severity) => {

    switch (severity) {

      case "CRITICAL":
        return "live-threat-critical";

      case "HIGH":
        return "live-threat-high";

      case "MEDIUM":
        return "live-threat-medium";

      default:
        return "live-threat-low";
    }
  };

  return (
    <div className="live-threats-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-heading live-threat-heading">

        <div>

          <div className="eyebrow">
            THREAT INTELLIGENCE
          </div>

          <h1>
            Live Threats
          </h1>

          <p>
            Real-time security threats detected
            across your cloud environment.
          </p>

        </div>

        <div className="live-indicator">

          <span></span>

          LIVE MONITORING

        </div>

      </div>


      {/* =====================================================
          THREAT ENGINE STATUS
      ===================================================== */}

      <section className="threat-status-banner">

        <div className="threat-status-icon">

          <Radio size={24} />

        </div>

        <div className="threat-status-content">

          <div className="threat-status-title">
            AutoSEC AI Threat Engine
          </div>

          <div className="threat-status-description">
            Cloud activity is being monitored,
            analyzed and classified in real time.
          </div>

        </div>

        <div className="threat-engine-status">

          <span></span>

          ENGINE ACTIVE

        </div>

      </section>


      {/* =====================================================
          THREAT METRICS
      ===================================================== */}

      <section className="live-threat-metrics">

        {/* CRITICAL */}

        <div className="live-threat-metric critical">

          <div className="metric-icon">

            <ShieldAlert size={20} />

          </div>

          <div>

            <span>
              CRITICAL
            </span>

            <strong>
              {criticalThreats.length}
            </strong>

            <small>
              Requires immediate attention
            </small>

          </div>

        </div>


        {/* HIGH */}

        <div className="live-threat-metric high">

          <div className="metric-icon">

            <AlertTriangle size={20} />

          </div>

          <div>

            <span>
              HIGH
            </span>

            <strong>
              {highThreats.length}
            </strong>

            <small>
              Elevated security risk
            </small>

          </div>

        </div>


        {/* MEDIUM */}

        <div className="live-threat-metric medium">

          <div className="metric-icon">

            <Activity size={20} />

          </div>

          <div>

            <span>
              MEDIUM
            </span>

            <strong>
              {mediumThreats.length}
            </strong>

            <small>
              Requires monitoring
            </small>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="live-threat-metric active">

          <div className="metric-icon">

            <Zap size={20} />

          </div>

          <div>

            <span>
              ACTIVE
            </span>

            <strong>
              {activeThreats.length}
            </strong>

            <small>
              Open security incidents
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          LIVE SYSTEM TELEMETRY
      ===================================================== */}

      <section className="live-system-strip">

        <div className="telemetry-item">

          <span className="telemetry-pulse"></span>

          <div>

            <small>
              THREAT ENGINE
            </small>

            <strong>
              ACTIVE
            </strong>

          </div>

        </div>


        <div className="telemetry-divider"></div>


        <div className="telemetry-item">

          <Activity size={15} />

          <div>

            <small>
              EVENT PROCESSING
            </small>

            <strong>
              REAL-TIME
            </strong>

          </div>

        </div>


        <div className="telemetry-divider"></div>


        <div className="telemetry-item">

          <Server size={15} />

          <div>

            <small>
              AWS REGION
            </small>

            <strong>
              AP-SOUTH-1
            </strong>

          </div>

        </div>


        <div className="telemetry-divider"></div>


        <div className="telemetry-item">

          <Bot size={15} />

          <div>

            <small>
              AI ANALYSIS
            </small>

            <strong>
              READY
            </strong>

          </div>

        </div>


        <div className="telemetry-divider"></div>


        <div className="telemetry-item">

          <ShieldCheck size={15} />

          <div>

            <small>
              RESPONSE ENGINE
            </small>

            <strong>
              READY
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          LIVE THREAT FEED
      ===================================================== */}

      <section className="live-threat-feed">

        <div className="live-feed-header">

          <div>

            <div className="panel-eyebrow">
              LIVE TELEMETRY
            </div>

            <h2>
              Active Threat Feed
            </h2>

            <p>
              Security events currently requiring
              monitoring or response.
            </p>

          </div>


          <div className="feed-header-right">

            <div className="feed-event-count">

              <strong>
                {activeThreats.length}
              </strong>

              <span>
                ACTIVE EVENTS
              </span>

            </div>

            <div className="feed-live">

              <span></span>

              LIVE

            </div>

          </div>

        </div>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {activeThreats.length === 0 ? (

          <div className="no-live-threats">

            <div className="no-threat-icon">

              <ShieldCheck size={30} />

            </div>

            <h3>
              No Active Threats
            </h3>

            <p>
              AutoSEC AI has not detected any
              unresolved security threats.
            </p>

            <div className="monitoring-ready">

              <span></span>

              MONITORING ENVIRONMENT

            </div>

          </div>

        ) : (

          /* =================================================
             THREAT LIST
          ================================================= */

          <div className="live-threat-list">

            {activeThreats.map((incident) => (

              <article
                key={incident.id}
                className={`live-threat-card ${severityClass(
                  incident.severity
                )}`}
              >

                {/* Severity indicator */}

                <div className="live-threat-indicator">

                  <span></span>

                </div>


                {/* Main content */}

                <div className="live-threat-main">

                  {/* TOP */}

                  <div className="live-threat-top">

                    <div className="live-threat-title">

                      <ShieldAlert size={18} />

                      <div>

                        <span className="threat-event-label">
                          SECURITY EVENT
                        </span>

                        <h3>
                          {incident.threat}
                        </h3>

                      </div>

                    </div>


                    <span className="live-severity">

                      {incident.severity}

                    </span>

                  </div>


                  {/* META */}

                  <div className="live-threat-meta">

                    <div>

                      <Globe size={14} />

                      <span>
                        {incident.source_ip ||
                          "UNKNOWN SOURCE"}
                      </span>

                    </div>


                    <div>

                      <Clock3 size={14} />

                      <span>
                        {formatTime(
                          incident.created_at
                        )}
                      </span>

                    </div>


                    <div>

                      <Fingerprint size={14} />

                      <span>
                        INCIDENT #{incident.id}
                      </span>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="live-threat-description">

                    {incident.description ||
                      "Security threat detected by AutoSEC AI."}

                  </p>


                  {/* RESPONSE */}

                  <div className="live-threat-action">

                    <Zap size={14} />

                    <span>
                      RESPONSE:
                    </span>

                    <strong>
                      {incident.action_taken ||
                        "MONITOR_ACTIVITY"}
                    </strong>

                  </div>


                  {/* AI STATUS */}

                  <div className="live-threat-ai">

                    <Bot size={13} />

                    <span>
                      AI THREAT ANALYSIS
                    </span>

                    <b>
                      PROCESSED
                    </b>

                  </div>

                </div>


                {/* STATUS */}

                <div className="live-threat-status">

                  <span className="active-dot"></span>

                  ACTIVE

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default LiveThreats;