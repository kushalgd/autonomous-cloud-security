import { useState } from "react";
import axios from "axios";

import {
  ShieldAlert,
  CheckCircle2,
  Clock3,
  X,
  Server,
  Globe,
  Activity,
  Zap,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

function IncidentTable({ incidents = [], onIncidentUpdated }) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [resolving, setResolving] = useState(false);

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "severity-critical";

      case "HIGH":
        return "severity-high";

      case "MEDIUM":
        return "severity-medium";

      default:
        return "severity-low";
    }
  };

  const getStatusClass = (status) => {
    return status === "RESOLVED"
      ? "status-resolved"
      : "status-open";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleResolve = async () => {
    if (!selectedIncident) return;

    try {
      setResolving(true);

      await axios.put(
        `${API_URL}/incidents/${selectedIncident.id}/status`,
        null,
        {
          params: {
            status: "RESOLVED",
          },
        }
      );

      setSelectedIncident((previous) => ({
        ...previous,
        status: "RESOLVED",
      }));

      if (onIncidentUpdated) {
        await onIncidentUpdated();
      }

    } catch (error) {
      console.error(
        "Failed to resolve incident:",
        error
      );

      alert(
        "Unable to resolve incident. Please check the backend."
      );

    } finally {
      setResolving(false);
    }
  };

  return (
    <>
      <section className="incidents-panel">

        <div className="panel-header">

          <div>
            <div className="panel-eyebrow">
              SECURITY EVENTS
            </div>

            <h2>
              Security Incidents
            </h2>

            <p>
              Threats detected and processed by AutoSEC AI
            </p>
          </div>

          <div className="incident-count">
            {incidents.length} EVENTS
          </div>

        </div>

        <div className="incident-table-wrapper">

          {incidents.length === 0 ? (

            <div className="empty-incidents">

              <ShieldAlert size={38} />

              <h3>
                No security incidents
              </h3>

              <p>
                AutoSEC AI is monitoring your
                cloud environment.
              </p>

            </div>

          ) : (

            <table className="incident-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>THREAT</th>
                  <th>SEVERITY</th>
                  <th>SOURCE IP</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                  <th>TIME</th>
                </tr>
              </thead>

              <tbody>

                {incidents.map((incident) => (

                  <tr
                    key={incident.id}
                    className="incident-row"
                    onClick={() =>
                      setSelectedIncident(incident)
                    }
                  >

                    <td className="incident-id">
                      #{incident.id}
                    </td>

                    <td>
                      <div className="threat-name">

                        <ShieldAlert size={16} />

                        <span>
                          {incident.threat}
                        </span>

                      </div>
                    </td>

                    <td>

                      <span
                        className={`severity-badge ${getSeverityClass(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>

                    </td>

                    <td className="source-ip">
                      {incident.source_ip || "UNKNOWN"}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${getStatusClass(
                          incident.status
                        )}`}
                      >

                        {incident.status === "RESOLVED" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {incident.status}

                      </span>

                    </td>

                    <td className="action-cell">

                      {incident.action_taken ? (
                        <span>
                          {incident.action_taken}
                        </span>
                      ) : (
                        <span className="no-action">
                          No action
                        </span>
                      )}

                    </td>

                    <td className="event-time">
                      {formatDate(
                        incident.created_at
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </section>

      {selectedIncident && (

        <div
          className="incident-modal-overlay"
          onClick={() =>
            setSelectedIncident(null)
          }
        >

          <div
            className="incident-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="incident-modal-header">

              <div>
                <div className="modal-eyebrow">
                  SECURITY INCIDENT
                </div>

                <h2>
                  {selectedIncident.threat}
                </h2>

                <span className="modal-incident-id">
                  Incident #{selectedIncident.id}
                </span>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedIncident(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-status-row">

              <span
                className={`severity-badge ${getSeverityClass(
                  selectedIncident.severity
                )}`}
              >
                {selectedIncident.severity}
              </span>

              <span
                className={`status-badge ${getStatusClass(
                  selectedIncident.status
                )}`}
              >

                {selectedIncident.status === "RESOLVED" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <Clock3 size={13} />
                )}

                {selectedIncident.status}

              </span>

            </div>

            <div className="incident-detail-grid">

              <div className="incident-detail-card">

                <Globe size={18} />

                <div>
                  <span>
                    SOURCE IP
                  </span>

                  <strong>
                    {selectedIncident.source_ip ||
                      "UNKNOWN"}
                  </strong>
                </div>

              </div>

              <div className="incident-detail-card">

                <Activity size={18} />

                <div>
                  <span>
                    DETECTION TIME
                  </span>

                  <strong>
                    {formatDate(
                      selectedIncident.created_at
                    )}
                  </strong>
                </div>

              </div>

              <div className="incident-detail-card">

                <Server size={18} />

                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    {selectedIncident.status}
                  </strong>
                </div>

              </div>

              <div className="incident-detail-card">

                <Zap size={18} />

                <div>
                  <span>
                    ACTION
                  </span>

                  <strong>
                    {selectedIncident.action_taken ||
                      "No action"}
                  </strong>
                </div>

              </div>

            </div>

            <div className="incident-description">

              <h3>
                Threat Analysis
              </h3>

              <p>
                {selectedIncident.description ||
                  "No threat analysis is available for this incident."}
              </p>

            </div>

            <div className="incident-modal-footer">

              <div className="ai-status">

                <span></span>

                AutoSEC AI Analysis

              </div>

              {selectedIncident.status !==
                "RESOLVED" && (

                <button
                  className="resolve-button"
                  onClick={handleResolve}
                  disabled={resolving}
                >

                  <CheckCircle2 size={17} />

                  {resolving
                    ? "Resolving..."
                    : "Mark as Resolved"}

                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default IncidentTable;