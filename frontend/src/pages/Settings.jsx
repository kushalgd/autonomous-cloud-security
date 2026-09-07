import {
  Settings as SettingsIcon,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Activity,
  Database,
  Bell,
  Lock,
} from "lucide-react";

function Settings() {
  return (
    <div className="settings-page">

      <div className="page-heading">

        <div>
          <div className="eyebrow">
            SYSTEM CONFIGURATION
          </div>

          <h1>
            Settings
          </h1>

          <p>
            Configure and monitor the AutoSEC AI
            security environment.
          </p>
        </div>

        <div className="settings-status">
          <span></span>
          SYSTEM CONFIGURED
        </div>

      </div>


      <section className="settings-grid">

        {/* AI ENGINE */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon purple">
              <BrainCircuit size={20} />
            </div>

            <div>
              <span>AI ENGINE</span>
              <h2>AI Analysis Provider</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>Provider</span>
            <strong>Ollama</strong>
          </div>

          <div className="setting-row">
            <span>Threat Analysis</span>

            <b className="setting-online">
              ONLINE
            </b>
          </div>

          <div className="setting-row">
            <span>AI Recommendations</span>
            <strong>Enabled</strong>
          </div>

        </div>


        {/* AWS */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon blue">
              <Cloud size={20} />
            </div>

            <div>
              <span>CLOUD SECURITY</span>
              <h2>AWS Monitoring</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>CloudTrail</span>

            <b className="setting-online">
              ACTIVE
            </b>
          </div>

          <div className="setting-row">
            <span>CloudWatch</span>

            <b className="setting-online">
              ACTIVE
            </b>
          </div>

          <div className="setting-row">
            <span>Region</span>
            <strong>ap-south-1</strong>
          </div>

        </div>


        {/* POLICY */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon green">
              <ShieldCheck size={20} />
            </div>

            <div>
              <span>SECURITY POLICY</span>
              <h2>Action Validation</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>Policy Engine</span>

            <b className="setting-online">
              ENABLED
            </b>
          </div>

          <div className="setting-row">
            <span>BLOCK_IP</span>
            <strong>Allowed</strong>
          </div>

          <div className="setting-row">
            <span>ENABLE_MFA</span>
            <strong>Allowed</strong>
          </div>

        </div>


        {/* MONITORING */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon orange">
              <Activity size={20} />
            </div>

            <div>
              <span>MONITORING</span>
              <h2>Live Monitoring</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>Polling Interval</span>
            <strong>10 seconds</strong>
          </div>

          <div className="setting-row">
            <span>Event Processing</span>

            <b className="setting-online">
              ACTIVE
            </b>
          </div>

          <div className="setting-row">
            <span>Duplicate Detection</span>

            <b className="setting-online">
              ENABLED
            </b>
          </div>

        </div>


        {/* DATABASE */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon cyan">
              <Database size={20} />
            </div>

            <div>
              <span>DATA STORAGE</span>
              <h2>Incident Database</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>Database</span>
            <strong>MySQL</strong>
          </div>

          <div className="setting-row">
            <span>Incident Storage</span>

            <b className="setting-online">
              CONNECTED
            </b>
          </div>

          <div className="setting-row">
            <span>Incident History</span>
            <strong>Persistent</strong>
          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon yellow">
              <Bell size={20} />
            </div>

            <div>
              <span>ALERTING</span>
              <h2>Security Notifications</h2>
            </div>

          </div>

          <div className="setting-row">
            <span>Critical Alerts</span>

            <b className="setting-online">
              ENABLED
            </b>
          </div>

          <div className="setting-row">
            <span>Threat Notifications</span>

            <b className="setting-online">
              ENABLED
            </b>
          </div>

          <div className="setting-row">
            <span>Self-Healing Alerts</span>

            <b className="setting-online">
              ENABLED
            </b>
          </div>

        </div>

      </section>


      <section className="settings-security">

        <Lock size={17} />

        <div>

          <strong>
            Security Configuration
          </strong>

          <p>
            Configuration changes should be
            performed through the backend security
            configuration layer. This interface
            currently provides a read-only system
            overview.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Settings;