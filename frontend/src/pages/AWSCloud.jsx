import {
  Cloud,
  Activity,
  ShieldCheck,
  Database,
  Radio,
  Server,
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  Zap,
} from "lucide-react";

function AWSCloud({ incidents = [] }) {

  /* =====================================================
     INCIDENT STATISTICS
  ===================================================== */

  const totalIncidents = incidents.length;

  const openIncidents = incidents.filter(
    (incident) =>
      incident.status === "OPEN"
  ).length;

  const criticalIncidents = incidents.filter(
    (incident) =>
      incident.severity === "CRITICAL"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) =>
      incident.status === "RESOLVED"
  ).length;


  /* =====================================================
     AWS CONFIGURATION
     
     VITE_AWS_REGION can be placed in:
     
     frontend/.env
     
     Example:
     VITE_AWS_REGION=ap-south-1
     
     Current project falls back to ap-south-1.
  ===================================================== */

  const awsRegion =
    import.meta.env.VITE_AWS_REGION ||
    "ap-south-1";


  /* =====================================================
     SERVICE CONFIGURATION
  ===================================================== */

  const services = [
    {
      name: "CLOUDWATCH",
      title: "Monitoring",
      description:
        "Live event polling active",
      icon: Activity,
      iconClass: "cloudwatch",
      status: "ACTIVE",
    },
    {
      name: "CLOUDTRAIL",
      title: "Audit Logging",
      description:
        "AWS API activity monitored",
      icon: ShieldCheck,
      iconClass: "cloudtrail",
      status: "ACTIVE",
    },
    {
      name: "LOG STREAM",
      title: "Receiving",
      description:
        "Security events available",
      icon: Database,
      iconClass: "logs",
      status: "ACTIVE",
    },
  ];


  /* =====================================================
     ENVIRONMENT INFORMATION
  ===================================================== */

  const environmentItems = [
    {
      label: "REGION",
      value: awsRegion,
      icon: Server,
    },
    {
      label: "CLOUD PROVIDER",
      value: "Amazon Web Services",
      icon: Cloud,
    },
    {
      label: "OPEN INCIDENTS",
      value: openIncidents,
      icon: Activity,
    },
    {
      label: "CRITICAL THREATS",
      value: criticalIncidents,
      icon: ShieldCheck,
    },
  ];


  return (
    <div className="aws-cloud-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            CLOUD SECURITY
          </div>

          <h1>
            AWS Cloud
          </h1>

          <p>
            Real-time security visibility across
            the monitored AWS environment.
          </p>

        </div>


        <div className="live-indicator">

          <span></span>

          AWS MONITORING ACTIVE

        </div>

      </div>


      {/* =================================================
          CONNECTION STATUS
      ================================================= */}

      <section className="aws-connection-banner">

        <div className="aws-connection-icon">
          <Cloud size={25} />
        </div>


        <div className="aws-connection-info">

          <strong>
            AWS Security Infrastructure
          </strong>

          <span>
            CloudTrail and CloudWatch telemetry
            pipeline is connected.
          </span>

        </div>


        <div className="aws-connected">

          <CheckCircle2 size={15} />

          CONNECTED

        </div>

      </section>


      {/* =================================================
          AWS SERVICE STATUS
      ================================================= */}

      <section className="aws-services-grid">

        {services.map((service) => {

          const Icon = service.icon;

          return (
            <div
              className="aws-service-card"
              key={service.name}
            >

              <div
                className={`aws-service-icon ${service.iconClass}`}
              >
                <Icon size={21} />
              </div>


              <div className="aws-service-info">

                <span>
                  {service.name}
                </span>

                <strong>
                  {service.title}
                </strong>

                <small>
                  {service.description}
                </small>

              </div>


              <div className="service-status">

                <span></span>

                {service.status}

              </div>

            </div>
          );
        })}

      </section>


      {/* =================================================
          AWS ENVIRONMENT
      ================================================= */}

      <section className="aws-environment-panel">

        <div className="panel-header">

          <div>

            <div className="panel-eyebrow">
              AWS ENVIRONMENT
            </div>

            <h2>
              Security Infrastructure
            </h2>

            <p>
              Current monitoring configuration
              used by AutoSEC AI.
            </p>

          </div>


          <div className="aws-environment-live">

            <CircleDot size={18} />

          </div>

        </div>


        <div className="aws-environment-grid">

          {environmentItems.map((item) => {

            const Icon = item.icon;

            return (
              <div
                className="aws-environment-item"
                key={item.label}
              >

                <Icon size={18} />

                <div>

                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}
                  </strong>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =================================================
          SECURITY TELEMETRY
      ================================================= */}

      <section className="aws-telemetry-panel">

        <div className="aws-telemetry-header">

          <div>

            <div className="panel-eyebrow">
              SECURITY TELEMETRY
            </div>

            <h2>
              AWS Event Pipeline
            </h2>

            <p>
              Security events flow from AWS
              infrastructure into AutoSEC AI.
            </p>

          </div>


          <div className="telemetry-live">

            <span></span>

            STREAM READY

          </div>

        </div>


        {/* ===============================================
            PIPELINE
        =============================================== */}

        <div className="telemetry-flow">


          {/* AWS */}

          <div className="telemetry-node">

            <Cloud size={19} />

            <span>
              AWS
            </span>

          </div>


          <div className="telemetry-line">
            <span></span>
          </div>


          {/* CLOUDTRAIL */}

          <div className="telemetry-node">

            <ShieldCheck size={19} />

            <span>
              CloudTrail
            </span>

          </div>


          <div className="telemetry-line">
            <span></span>
          </div>


          {/* CLOUDWATCH */}

          <div className="telemetry-node">

            <Activity size={19} />

            <span>
              CloudWatch
            </span>

          </div>


          <div className="telemetry-line">
            <span></span>
          </div>


          {/* AUTOSEC AI */}

          <div className="telemetry-node active">

            <Radio size={19} />

            <span>
              AutoSEC AI
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          SECURITY SUMMARY
      ================================================= */}

      <section className="aws-summary-grid">


        {/* TOTAL EVENTS */}

        <div className="aws-summary-card">

          <div className="aws-summary-icon">

            <Database size={19} />

          </div>

          <div>

            <span>
              SECURITY EVENTS
            </span>

            <strong>
              {totalIncidents}
            </strong>

            <small>
              Detected and processed
            </small>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="aws-summary-card">

          <div className="aws-summary-icon">

            <Zap size={19} />

          </div>

          <div>

            <span>
              ACTIVE INCIDENTS
            </span>

            <strong>
              {openIncidents}
            </strong>

            <small>
              Currently requiring attention
            </small>

          </div>

        </div>


        {/* CRITICAL */}

        <div className="aws-summary-card">

          <div className="aws-summary-icon">

            <AlertTriangle size={19} />

          </div>

          <div>

            <span>
              CRITICAL THREATS
            </span>

            <strong>
              {criticalIncidents}
            </strong>

            <small>
              High-priority security events
            </small>

          </div>

        </div>


        {/* RESOLVED */}

        <div className="aws-summary-card">

          <div className="aws-summary-icon">

            <CheckCircle2 size={19} />

          </div>

          <div>

            <span>
              RESOLVED
            </span>

            <strong>
              {resolvedIncidents}
            </strong>

            <small>
              Successfully handled incidents
            </small>

          </div>

        </div>


      </section>


      {/* =================================================
          FOOTER STATUS
      ================================================= */}

      <div className="aws-page-status">

        <div>

          <span></span>

          <strong>
            AWS TELEMETRY ACTIVE
          </strong>

          <small>
            Region: {awsRegion}
          </small>

        </div>


        <div>

          <Radio size={15} />

          <span>
            AutoSEC AI monitoring pipeline ready
          </span>

        </div>

      </div>


    </div>
  );
}

export default AWSCloud;