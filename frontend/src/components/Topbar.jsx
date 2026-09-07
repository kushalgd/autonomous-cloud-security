import {
  Bell,
  Search,
  Wifi,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search threats, incidents..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>
        </div>

      </div>

      <div className="topbar-right">

        <div className="system-status">

          <div className="system-item">
            <span className="status-dot online"></span>
            <Wifi size={15} />
            <span>AWS</span>
          </div>

          <div className="system-item">
            <span className="status-dot online"></span>
            <BrainCircuit size={15} />
            <span>AI Engine</span>
          </div>

          <div className="system-item">
            <span className="status-dot online"></span>
            <ShieldCheck size={15} />
            <span>Security</span>
          </div>

        </div>

        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-badge">
            3
          </span>
        </button>

        <div className="profile">

          <div className="profile-avatar">
            AS
          </div>

          <div className="profile-info">
            <strong>Security Admin</strong>
            <span>Administrator</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;