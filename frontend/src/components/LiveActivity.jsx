import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Cloud,
  Bot,
} from "lucide-react";

function LiveActivity({ incidents = [] }) {

  const latestIncidents = incidents.slice(0, 6);

  const getIcon = (incident) => {

    if (incident.severity === "CRITICAL") {
      return AlertTriangle;
    }

    if (incident.status === "RESOLVED") {
      return ShieldCheck;
    }

    return Activity;
  };

  return (
    <section className="activity-panel">

      <div className="panel-header compact">

        <div>
          <div className="panel-eyebrow">
            LIVE TELEMETRY
          </div>

          <h2>
            AWS Activity
          </h2>
        </div>

        <div className="live-feed">
          <span></span>
          LIVE
        </div>

      </div>

      <div className="activity-feed">

        <div className="activity-item system-event">

          <div className="activity-icon aws">
            <Cloud size={15} />
          </div>

          <div className="activity-content">

            <strong>
              AWS CloudTrail
            </strong>

            <span>
              Cloud activity monitoring active
            </span>

          </div>

          <time>
            LIVE
          </time>

        </div>


        <div className="activity-item system-event">

          <div className="activity-icon ai">
            <Bot size={15} />
          </div>

          <div className="activity-content">

            <strong>
              AI Threat Engine
            </strong>

            <span>
              Threat analysis pipeline ready
            </span>

          </div>

          <time>
            READY
          </time>

        </div>


        {latestIncidents.map((incident) => {

          const Icon = getIcon(incident);

          return (
            <div
              className="activity-item"
              key={`activity-${incident.id}`}
            >

              <div className="activity-icon threat">
                <Icon size={15} />
              </div>

              <div className="activity-content">

                <strong>
                  {incident.threat}
                </strong>

                <span>
                  {incident.source_ip ||
                    "Unknown source"}
                </span>

              </div>

              <time>
                {incident.severity}
              </time>

            </div>
          );

        })}

      </div>

    </section>
  );
}

export default LiveActivity;