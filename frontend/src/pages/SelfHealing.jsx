import {
  Zap,
  ShieldCheck,
  Ban,
  KeyRound,
  Eye,
  Activity,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  UserX,
  FileText,
  LockKeyhole,
} from "lucide-react";

function SelfHealing({ incidents = [] }) {
  /*
   * =========================================
   * INCIDENT / ACTION DATA
   * =========================================
   */

  const activeIncidents = incidents.filter(
    (incident) =>
      incident.status !== "RESOLVED"
  );

  const resolvedIncidents = incidents.filter(
    (incident) =>
      incident.status === "RESOLVED"
  );

  const blockedActions = incidents.filter(
    (incident) =>
      incident.action_taken?.includes("BLOCK")
  ).length;

  const mfaActions = incidents.filter(
    (incident) =>
      incident.action_taken?.includes("MFA")
  ).length;

  const monitoringActions = incidents.filter(
    (incident) =>
      incident.action_taken?.includes("MONITOR")
  ).length;

  const disabledAccountActions = incidents.filter(
    (incident) =>
      incident.action_taken?.includes(
        "DISABLED"
      )
  ).length;

  /*
   * =========================================
   * ACTION ICON
   * =========================================
   */

  const getActionIcon = (action) => {
    if (action.includes("BLOCK")) {
      return Ban;
    }

    if (
      action.includes("DISABLED") ||
      action.includes("DISABLE")
    ) {
      return UserX;
    }

    if (action.includes("MFA")) {
      return KeyRound;
    }

    if (action.includes("ALERT")) {
      return AlertTriangle;
    }

    if (action.includes("INCIDENT")) {
      return FileText;
    }

    return Eye;
  };

  /*
   * =========================================
   * ACTION STYLE
   * =========================================
   */

  const getActionClass = (action) => {
    if (action.includes("BLOCK")) {
      return "healing-block";
    }

    if (
      action.includes("DISABLED") ||
      action.includes("DISABLE")
    ) {
      return "healing-disable";
    }

    if (action.includes("MFA")) {
      return "healing-mfa";
    }

    if (action.includes("ALERT")) {
      return "healing-alert";
    }

    return "healing-monitor";
  };

  /*
   * =========================================
   * FORMAT TIME
   * =========================================
   */

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

  /*
   * =========================================
   * PAGE
   * =========================================
   */

  return (
    <div className="self-healing-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="page-heading">

        <div>
          <div className="eyebrow">
            AUTONOMOUS RESPONSE
          </div>

          <h1>
            Self-Healing
          </h1>

          <p>
            Autonomous security response actions
            controlled by the AutoSEC AI policy
            engine.
          </p>
        </div>

        <div className="healing-engine-status">
          <span></span>
          HEALING ENGINE READY
        </div>

      </div>


      {/* =====================================
          ENGINE BANNER
      ====================================== */}

      <section className="healing-banner">

        <div className="healing-banner-icon">
          <Zap size={27} />
        </div>

        <div className="healing-banner-content">

          <div className="healing-banner-title">

            <strong>
              Autonomous Security Response
            </strong>

            <span>
              ONLINE
            </span>

          </div>

          <p>
            AutoSEC AI validates recommended
            security actions through the policy
            layer before execution.
          </p>

        </div>

        <div className="policy-status">
          <ShieldCheck size={15} />
          POLICY ENFORCED
        </div>

      </section>


      {/* =====================================
          METRICS
      ====================================== */}

      <section className="healing-metrics">

        {/* BLOCK IP */}

        <div className="healing-metric">

          <div className="healing-metric-icon red">
            <Ban size={20} />
          </div>

          <div>
            <span>
              BLOCK IP
            </span>

            <strong>
              {blockedActions}
            </strong>

            <small>
              IP protection actions
            </small>
          </div>

        </div>


        {/* ENABLE MFA */}

        <div className="healing-metric">

          <div className="healing-metric-icon purple">
            <KeyRound size={20} />
          </div>

          <div>
            <span>
              ENABLE MFA
            </span>

            <strong>
              {mfaActions}
            </strong>

            <small>
              Identity protection actions
            </small>
          </div>

        </div>


        {/* MONITOR */}

        <div className="healing-metric">

          <div className="healing-metric-icon blue">
            <Eye size={20} />
          </div>

          <div>
            <span>
              MONITOR
            </span>

            <strong>
              {monitoringActions}
            </strong>

            <small>
              Monitoring responses
            </small>
          </div>

        </div>


        {/* ACTIVE THREATS */}

        <div className="healing-metric">

          <div className="healing-metric-icon yellow">
            <Activity size={20} />
          </div>

          <div>
            <span>
              ACTIVE THREATS
            </span>

            <strong>
              {activeIncidents.length}
            </strong>

            <small>
              Awaiting resolution
            </small>
          </div>

        </div>

      </section>


      {/* =====================================
          RESPONSE PIPELINE
      ====================================== */}

      <section className="healing-pipeline">

        <div className="panel-header">

          <div>

            <div className="panel-eyebrow">
              RESPONSE PIPELINE
            </div>

            <h2>
              Autonomous Security Workflow
            </h2>

            <p>
              Every automated response passes
              through policy validation before
              execution.
            </p>

          </div>

          <div className="pipeline-status">
            <span></span>
            PIPELINE READY
          </div>

        </div>


        <div className="healing-flow">

          {/* THREAT */}

          <div className="healing-node">

            <Activity size={19} />

            <div>
              <strong>
                Threat
              </strong>

              <span>
                Detection
              </span>
            </div>

          </div>


          <div className="healing-connector">
            <span></span>
          </div>


          {/* POLICY */}

          <div className="healing-node">

            <ShieldCheck size={19} />

            <div>
              <strong>
                Policy
              </strong>

              <span>
                Validation
              </span>
            </div>

          </div>


          <div className="healing-connector">
            <span></span>
          </div>


          {/* ACTION */}

          <div className="healing-node active">

            <Zap size={19} />

            <div>
              <strong>
                Action
              </strong>

              <span>
                Execution
              </span>
            </div>

          </div>


          <div className="healing-connector">
            <span></span>
          </div>


          {/* RECOVER */}

          <div className="healing-node success">

            <CheckCircle2 size={19} />

            <div>
              <strong>
                Recover
              </strong>

              <span>
                Verification
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          ACTION SUMMARY
      ====================================== */}

      <section className="healing-summary-grid">

        <div className="healing-summary-card">

          <div className="summary-icon">
            <LockKeyhole size={18} />
          </div>

          <div>
            <span>
              POLICY CONTROL
            </span>

            <strong>
              ENFORCED
            </strong>

            <small>
              Unauthorized actions are blocked
            </small>
          </div>

        </div>


        <div className="healing-summary-card">

          <div className="summary-icon">
            <Zap size={18} />
          </div>

          <div>
            <span>
              AUTOMATED RESPONSES
            </span>

            <strong>
              {incidents.length}
            </strong>

            <small>
              Security responses recorded
            </small>
          </div>

        </div>


        <div className="healing-summary-card">

          <div className="summary-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>
              RESOLVED INCIDENTS
            </span>

            <strong>
              {resolvedIncidents.length}
            </strong>

            <small>
              Successfully completed incidents
            </small>
          </div>

        </div>


        <div className="healing-summary-card">

          <div className="summary-icon">
            <UserX size={18} />
          </div>

          <div>
            <span>
              ACCOUNT PROTECTION
            </span>

            <strong>
              {disabledAccountActions}
            </strong>

            <small>
              Account protection actions
            </small>
          </div>

        </div>

      </section>


      {/* =====================================
          RECENT ACTIONS
      ====================================== */}

      <section className="healing-actions">

        <div className="healing-actions-header">

          <div>

            <div className="panel-eyebrow">
              RESPONSE ACTIVITY
            </div>

            <h2>
              Recent Self-Healing Actions
            </h2>

            <p>
              Automated responses generated from
              detected security incidents.
            </p>

          </div>

          <div className="dry-run-indicator">
            <span></span>
            CONTROLLED EXECUTION
          </div>

        </div>


        {/* EMPTY STATE */}

        {incidents.length === 0 ? (

          <div className="healing-empty">

            <ShieldCheck size={35} />

            <h3>
              No healing actions
            </h3>

            <p>
              AutoSEC AI will display automated
              response activity when threats are
              detected.
            </p>

            <div className="healing-monitoring-state">
              <span></span>
              MONITORING ENVIRONMENT
            </div>

          </div>

        ) : (

          <div className="healing-action-list">

            {incidents
              .slice(0, 8)
              .map((incident) => {

                const action =
                  incident.action_taken ||
                  "MONITOR_ACTIVITY";

                const Icon =
                  getActionIcon(action);

                const actionClass =
                  getActionClass(action);

                return (
                  <article
                    key={incident.id}
                    className="healing-action-row"
                  >

                    {/* ACTION ICON */}

                    <div
                      className={`healing-action-icon ${actionClass}`}
                    >
                      <Icon size={17} />
                    </div>


                    {/* MAIN CONTENT */}

                    <div className="healing-action-main">

                      <div className="healing-action-title">

                        <strong>
                          {action}
                        </strong>

                        <span>
                          INCIDENT #{incident.id}
                        </span>

                      </div>

                      <p>
                        {incident.threat}

                        {incident.source_ip
                          ? ` • ${incident.source_ip}`
                          : ""}
                      </p>

                      <small>
                        {formatTime(
                          incident.created_at
                        )}
                      </small>

                    </div>


                    {/* SEVERITY */}

                    <div
                      className={`healing-severity healing-severity-${(
                        incident.severity ||
                        "LOW"
                      ).toLowerCase()}`}
                    >
                      {incident.severity ||
                        "LOW"}
                    </div>


                    {/* STATUS */}

                    <div
                      className={`healing-action-status ${
                        incident.status ===
                        "RESOLVED"
                          ? "resolved"
                          : "active"
                      }`}
                    >

                      {incident.status ===
                      "RESOLVED" ? (
                        <>
                          <CheckCircle2
                            size={14}
                          />
                          RESOLVED
                        </>
                      ) : (
                        <>
                          <Clock3
                            size={14}
                          />
                          ACTIVE
                        </>
                      )}

                    </div>

                  </article>
                );
              })}

          </div>

        )}

      </section>


      {/* =====================================
          SAFETY NOTICE
      ====================================== */}

      <section className="healing-safety">

        <div className="healing-safety-icon">
          <AlertTriangle size={17} />
        </div>

        <div>

          <strong>
            Autonomous action safety
          </strong>

          <p>
            Only actions explicitly permitted by
            the AutoSEC AI security policy can
            proceed to the execution layer.
            Every response is tracked against its
            originating security incident.
          </p>

        </div>

        <div className="healing-safety-status">
          <span></span>
          POLICY ACTIVE
        </div>

      </section>

    </div>
  );
}

export default SelfHealing;