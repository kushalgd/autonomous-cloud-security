import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
}) {
  return (
    <div className={`stat-card ${variant}`}>

      <div className="stat-top">

        <div className="stat-icon">
          <Icon size={20} />
        </div>

        {subtitle && (
          <div className="stat-trend">
            <TrendingUp size={13} />
            {subtitle}
          </div>
        )}

      </div>

      <div className="stat-content">

        <span>{title}</span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}

export default StatCard;