import {
  ShieldAlert,
  AlertTriangle,
  Activity,
} from "lucide-react";

function ThreatChart({ incidents = [] }) {

  const critical = incidents.filter(
    (incident) => incident.severity === "CRITICAL"
  ).length;

  const high = incidents.filter(
    (incident) => incident.severity === "HIGH"
  ).length;

  const medium = incidents.filter(
    (incident) => incident.severity === "MEDIUM"
  ).length;

  const low = incidents.filter(
    (incident) =>
      incident.severity !== "CRITICAL" &&
      incident.severity !== "HIGH" &&
      incident.severity !== "MEDIUM"
  ).length;

  const total = incidents.length;

  const getPercentage = (value) => {
    if (total === 0) {
      return 0;
    }

    return Math.round((value / total) * 100);
  };

  const threatLevels = [
    {
      name: "Critical",
      count: critical,
      percentage: getPercentage(critical),
      icon: ShieldAlert,
      className: "chart-critical",
    },
    {
      name: "High",
      count: high,
      percentage: getPercentage(high),
      icon: AlertTriangle,
      className: "chart-high",
    },
    {
      name: "Medium",
      count: medium,
      percentage: getPercentage(medium),
      icon: Activity,
      className: "chart-medium",
    },
    {
      name: "Low",
      count: low,
      percentage: getPercentage(low),
      icon: Activity,
      className: "chart-low",
    },
  ];

  return (
    <section className="threat-chart-panel">

      <div className="panel-header">

        <div>
          <div className="panel-eyebrow">
            THREAT DISTRIBUTION
          </div>

          <h2>
            Threat Severity
          </h2>

          <p>
            Distribution of detected security incidents
            by severity.
          </p>
        </div>

        <div className="chart-total">
          <strong>{total}</strong>
          <span>EVENTS</span>
        </div>

      </div>

      <div className="threat-chart-body">

        {threatLevels.map((level) => {

          const Icon = level.icon;

          return (
            <div
              className="threat-chart-row"
              key={level.name}
            >

              <div className="chart-label">

                <div
                  className={`chart-icon ${level.className}`}
                >
                  <Icon size={15} />
                </div>

                <div>

                  <strong>
                    {level.name}
                  </strong>

                  <span>
                    {level.count} incident
                    {level.count !== 1 ? "s" : ""}
                  </span>

                </div>

              </div>

              <div className="chart-progress">

                <div className="chart-track">

                  <div
                    className={`chart-fill ${level.className}`}
                    style={{
                      width: `${level.percentage}%`,
                    }}
                  />

                </div>

                <strong>
                  {level.percentage}%
                </strong>

              </div>

            </div>
          );
        })}

      </div>

      {total === 0 && (
        <div className="chart-empty">

          <ShieldAlert size={24} />

          <span>
            No security events detected
          </span>

          <small>
            Threat distribution will appear when
            incidents are received.
          </small>

        </div>
      )}

    </section>
  );
}

export default ThreatChart;