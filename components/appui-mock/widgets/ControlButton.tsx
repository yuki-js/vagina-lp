import styles from "./ControlButton.module.css";

interface ControlButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  enabled?: boolean;
  activeColor?: "error" | "warning" | "primary";
  onClick?: () => void;
}

export function ControlButton({
  icon,
  label,
  isActive = false,
  enabled = true,
  activeColor = "primary",
  onClick,
}: ControlButtonProps) {
  const getColor = () => {
    if (!enabled) {
      return "#6B7280";
    }
    if (isActive) {
      if (activeColor === "error") return "#FF6B6B";
      if (activeColor === "warning") return "#FFE66D";
      return "#6C63FF";
    }
    return "#B8B8D1";
  };

  const getBackgroundColor = () => {
    if (isActive) {
      if (activeColor === "error") return "rgba(255, 107, 107, 0.2)";
      if (activeColor === "warning") return "rgba(255, 230, 109, 0.2)";
      return "rgba(108, 99, 255, 0.2)";
    }
    return "transparent";
  };

  return (
    <button
      className={`${styles.button} ${!enabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={!enabled}
      style={{
        color: getColor(),
        "--bg-color": getBackgroundColor(),
      } as React.CSSProperties}
    >
      <div className={styles.iconContainer} style={{ backgroundColor: getBackgroundColor() }}>
        <span className={styles.icon} style={{ color: getColor() }}>
          {icon}
        </span>
      </div>
      <span className={styles.label} style={{ color: getColor() }}>
        {label}
      </span>
    </button>
  );
}
