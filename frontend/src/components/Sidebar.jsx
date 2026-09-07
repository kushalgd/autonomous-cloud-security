import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  Cloud,
  BrainCircuit,
  Zap,
  FileWarning,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed, activePage, setActivePage }) {
  const menuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Live Threats",
      icon: ShieldAlert,
    },
    {
      name: "Incidents",
      icon: FileWarning,
    },
    {
      name: "AWS Cloud",
      icon: Cloud,
    },
    {
      name: "AI Analysis",
      icon: BrainCircuit,
    },
    {
      name: "Self-Healing",
      icon: Zap,
    },
    {
      name: "Security Logs",
      icon: Activity,
    },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-logo">
        <div className="logo-icon">
          <ShieldAlert size={24} />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <strong>AutoSEC</strong>
            <span>AI</span>
          </div>
        )}
      </div>

      <div className="sidebar-section">
        {!collapsed && (
          <p className="section-title">
            SECURITY CENTER
          </p>
        )}

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage(item.name)
                }
                title={collapsed ? item.name : ""}
              >
                <Icon size={19} />

                {!collapsed && (
                  <span>{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">

        <button
  className={`nav-item ${
    activePage === "Settings"
      ? "active"
      : ""
  }`}
  onClick={() =>
    setActivePage("Settings")
  }
  title={collapsed ? "Settings" : ""}
>
          <Settings size={19} />

          {!collapsed && (
            <span>Settings</span>
          )}
        </button>

        <button
          className="collapse-button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}

          {!collapsed && (
            <span>Collapse</span>
          )}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;