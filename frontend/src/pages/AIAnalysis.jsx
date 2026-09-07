import {
  BrainCircuit,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Sparkles,
  Target,
  Clock3,
  Globe,
  Zap,
  FileSearch,
  Cpu,
  Lock,
} from "lucide-react";

function AIAnalysis({ incidents = [] }) {

  /* =====================================================
     ANALYZED INCIDENTS
     
     An incident is considered analyzed when the backend
     contains either a description or an action.
  ===================================================== */

  const analyzedIncidents = incidents.filter(
    (incident) =>
      Boolean(incident.description) ||
      Boolean(incident.action_taken)
  );


  /* =====================================================
     STATISTICS
  ===================================================== */

  const criticalCount = incidents.filter(
    (incident) =>
      incident.severity === "CRITICAL"
  ).length;


  const actionCount = incidents.filter(
    (incident) =>
      Boolean(incident.action_taken)
  ).length;


  const openCount = incidents.filter(
    (incident) =>
      incident.status === "OPEN"
  ).length;


  const resolvedCount = incidents.filter(
    (incident) =>
      incident.status === "RESOLVED"
  ).length;


  /*
    Backend currently returns incidents ordered by
    created_at DESC, so the first analyzed incident
    is the latest available analysis.
  */

  const latestIncident =
    analyzedIncidents.length > 0
      ? analyzedIncidents[0]
      : null;


  /* =====================================================
     TIME FORMATTER
  ===================================================== */

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


  /* =====================================================
     SEVERITY CLASS
  ===================================================== */

  const getSeverityClass = (severity) => {

    switch (severity) {

      case "CRITICAL":
        return "ai-critical";

      case "HIGH":
        return "ai-high";

      case "MEDIUM":
        return "ai-medium";

      case "LOW":
        return "ai-low";

      default:
        return "ai-low";
    }
  };


  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const getStatusClass = (status) => {

    if (status === "RESOLVED") {
      return "ai-status-resolved";
    }

    return "ai-status-open";
  };


  return (
    <div className="ai-analysis-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            ARTIFICIAL INTELLIGENCE
          </div>

          <h1>
            AI Analysis
          </h1>

          <p>
            Intelligent threat analysis and
            security response recommendations.
          </p>

        </div>


        <div className="ai-engine-live">

          <span></span>

          AI ENGINE ACTIVE

        </div>

      </div>


      {/* =================================================
          AI ENGINE BANNER
      ================================================= */}

      <section className="ai-engine-banner">

        <div className="ai-engine-icon">
          <BrainCircuit size={28} />
        </div>


        <div className="ai-engine-info">

          <div className="ai-engine-title">

            <strong>
              AutoSEC AI Threat Intelligence Engine
            </strong>

            <span>
              ONLINE
            </span>

          </div>


          <p>
            Detected security incidents are analyzed
            by the configured AI pipeline. Resulting
            recommendations are evaluated by the
            security policy layer before response.
          </p>

        </div>


        <div className="ai-pulse">

          <Sparkles size={17} />

          AI READY

        </div>

      </section>


      {/* =================================================
          AI PIPELINE
      ================================================= */}

      <section className="ai-pipeline-panel">

        <div className="ai-pipeline-header">

          <div>

            <div className="panel-eyebrow">
              INTELLIGENCE PIPELINE
            </div>

            <h2>
              Threat Analysis Workflow
            </h2>

          </div>


          <div className="ai-pipeline-status">

            <span></span>

            PIPELINE READY

          </div>

        </div>


        <div className="ai-pipeline-flow">


          <div className="ai-pipeline-node">

            <div className="ai-pipeline-icon">
              <FileSearch size={18} />
            </div>

            <div>
              <strong>
                Threat
              </strong>

              <span>
                Detection
              </span>
            </div>

          </div>


          <div className="ai-pipeline-line">
            <span></span>
          </div>


          <div className="ai-pipeline-node">

            <div className="ai-pipeline-icon">
              <BrainCircuit size={18} />
            </div>

            <div>
              <strong>
                AI
              </strong>

              <span>
                Analysis
              </span>
            </div>

          </div>


          <div className="ai-pipeline-line">
            <span></span>
          </div>


          <div className="ai-pipeline-node">

            <div className="ai-pipeline-icon">
              <Target size={18} />
            </div>

            <div>
              <strong>
                Policy
              </strong>

              <span>
                Validation
              </span>
            </div>

          </div>


          <div className="ai-pipeline-line">
            <span></span>
          </div>


          <div className="ai-pipeline-node active">

            <div className="ai-pipeline-icon">
              <Zap size={18} />
            </div>

            <div>
              <strong>
                Response
              </strong>

              <span>
                Action
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          METRICS
      ================================================= */}

      <section className="ai-metrics-grid">


        {/* ANALYZED */}

        <div className="ai-metric-card">

          <div className="ai-metric-icon blue">
            <Activity size={20} />
          </div>


          <div>

            <span>
              INCIDENTS ANALYZED
            </span>

            <strong>
              {analyzedIncidents.length}
            </strong>

            <small>
              Available security intelligence
            </small>

          </div>

        </div>


        {/* CRITICAL */}

        <div className="ai-metric-card">

          <div className="ai-metric-icon red">
            <ShieldAlert size={20} />
          </div>


          <div>

            <span>
              CRITICAL THREATS
            </span>

            <strong>
              {criticalCount}
            </strong>

            <small>
              High-priority intelligence
            </small>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="ai-metric-card">

          <div className="ai-metric-icon green">
            <CheckCircle2 size={20} />
          </div>


          <div>

            <span>
              ACTIONS IDENTIFIED
            </span>

            <strong>
              {actionCount}
            </strong>

            <small>
              Recorded security responses
            </small>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="ai-metric-card">

          <div className="ai-metric-icon purple">
            <Cpu size={20} />
          </div>


          <div>

            <span>
              ACTIVE ANALYSIS
            </span>

            <strong>
              {openCount}
            </strong>

            <small>
              Open incidents under monitoring
            </small>

          </div>

        </div>

      </section>


      {/* =================================================
          ANALYSIS WORKSPACE
      ================================================= */}

      <section className="ai-analysis-workspace">


        {/* WORKSPACE HEADER */}

        <div className="ai-workspace-header">

          <div>

            <div className="panel-eyebrow">
              AI SECURITY INTELLIGENCE
            </div>

            <h2>
              Latest Threat Analysis
            </h2>

            <p>
              Most recent analyzed security incident
              received from the AutoSEC AI pipeline.
            </p>

          </div>


          <div className="ai-confidence">

            <Lock size={14} />

            POLICY CONTROLLED

          </div>

        </div>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!latestIncident ? (

          <div className="ai-empty-state">

            <div className="ai-empty-icon">
              <BrainCircuit size={38} />
            </div>

            <h3>
              Waiting for security intelligence
            </h3>

            <p>
              AI analysis will appear here when
              security incidents are detected and
              processed by the threat intelligence
              pipeline.
            </p>

            <div className="ai-empty-status">

              <span></span>

              ANALYSIS ENGINE READY

            </div>

          </div>

        ) : (

          /* =================================================
             ANALYSIS CONTENT
          ================================================= */

          <div className="ai-analysis-content">


            {/* ---------------------------------------------
                THREAT HEADER
            --------------------------------------------- */}

            <div className="ai-threat-header">

              <div className="ai-threat-symbol">

                <ShieldAlert size={23} />

              </div>


              <div className="ai-threat-title">

                <span>
                  DETECTED THREAT
                </span>

                <h3>
                  {latestIncident.threat ||
                    "Unknown Security Threat"}
                </h3>

              </div>


              <div
                className={`ai-severity ${getSeverityClass(
                  latestIncident.severity
                )}`}
              >
                {latestIncident.severity ||
                  "UNKNOWN"}
              </div>

            </div>


            {/* ---------------------------------------------
                ANALYSIS
            --------------------------------------------- */}

            <div className="ai-analysis-section">

              <div className="ai-section-title">

                <BrainCircuit size={16} />

                THREAT ANALYSIS

              </div>


              <div className="ai-analysis-text">

                <p>
                  {latestIncident.description ||
                    "No AI analysis is currently available for this incident."}
                </p>

              </div>

            </div>


            {/* ---------------------------------------------
                RESPONSE
            --------------------------------------------- */}

            <div className="ai-response-section">

              <div className="ai-section-title">

                <Sparkles size={16} />

                RECOMMENDED / EXECUTED RESPONSE

              </div>


              <div className="ai-action-box">

                <CheckCircle2 size={17} />

                <div>

                  <span>
                    SECURITY ACTION
                  </span>

                  <strong>
                    {latestIncident.action_taken ||
                      "No security action has been recorded."}
                  </strong>

                </div>

              </div>

            </div>


            {/* ---------------------------------------------
                METADATA
            --------------------------------------------- */}

            <div className="ai-analysis-meta">


              {/* DETECTION TIME */}

              <div>

                <Clock3 size={14} />

                <div>

                  <span>
                    DETECTED
                  </span>

                  <strong>
                    {formatTime(
                      latestIncident.created_at
                    )}
                  </strong>

                </div>

              </div>


              {/* SOURCE IP */}

              <div>

                <Globe size={14} />

                <div>

                  <span>
                    SOURCE IP
                  </span>

                  <strong>
                    {latestIncident.source_ip ||
                      "UNKNOWN"}
                  </strong>

                </div>

              </div>


              {/* STATUS */}

              <div>

                <Activity size={14} />

                <div>

                  <span>
                    STATUS
                  </span>

                  <strong
                    className={getStatusClass(
                      latestIncident.status
                    )}
                  >
                    {latestIncident.status ||
                      "UNKNOWN"}
                  </strong>

                </div>

              </div>


              {/* INCIDENT ID */}

              <div>

                <Target size={14} />

                <div>

                  <span>
                    INCIDENT ID
                  </span>

                  <strong>
                    #{latestIncident.id}
                  </strong>

                </div>

              </div>

            </div>


          </div>

        )}

      </section>


      {/* =================================================
          ANALYSIS SUMMARY
      ================================================= */}

      <section className="ai-summary-panel">

        <div className="ai-summary-header">

          <div>

            <div className="panel-eyebrow">
              SECURITY INTELLIGENCE
            </div>

            <h2>
              Analysis Summary
            </h2>

          </div>


          <div className="ai-summary-badge">

            <span></span>

            ENGINE OPERATIONAL

          </div>

        </div>


        <div className="ai-summary-grid">


          <div className="ai-summary-item">

            <BrainCircuit size={18} />

            <div>

              <span>
                ANALYSIS ENGINE
              </span>

              <strong>
                AutoSEC AI
              </strong>

            </div>

          </div>


          <div className="ai-summary-item">

            <Activity size={18} />

            <div>

              <span>
                ANALYZED EVENTS
              </span>

              <strong>
                {analyzedIncidents.length}
              </strong>

            </div>

          </div>


          <div className="ai-summary-item">

            <CheckCircle2 size={18} />

            <div>

              <span>
                RESOLVED EVENTS
              </span>

              <strong>
                {resolvedCount}
              </strong>

            </div>

          </div>


          <div className="ai-summary-item">

            <Target size={18} />

            <div>

              <span>
                RESPONSE ACTIONS
              </span>

              <strong>
                {actionCount}
              </strong>

            </div>

          </div>

        </div>

      </section>


    </div>
  );
}

export default AIAnalysis;