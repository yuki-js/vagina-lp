import { MdSignalCellularAlt, MdWifi, MdBatteryFull } from "react-icons/md";
import styles from "./PhoneMock.module.css";

interface PhoneMockProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  showStatusBar?: boolean;
  isDark?: boolean;
}

export function PhoneMock({
  children,
  className,
  size = "medium",
  showStatusBar = true,
  isDark = false,
}: PhoneMockProps) {
  const sizeClass = styles[size];

  // Get current time for status bar
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={`${styles.phone} ${sizeClass} ${className ?? ""}`}>
      <div className={styles.screen}>
        <div className={styles.notch} />

        {/* Status Bar */}
        {showStatusBar && (
          <div
            className={`${styles.statusBar} ${isDark ? styles.statusBarDark : ""}`}
          >
            <div className={styles.statusLeft}>
              <span
                className={`${styles.time} ${isDark ? styles.timeDark : ""}`}
              >
                {time}
              </span>
            </div>
            <div className={styles.statusRight}>
              <MdSignalCellularAlt
                className={`${styles.statusIcon} ${isDark ? styles.statusIconDark : ""}`}
              />
              <MdWifi
                className={`${styles.statusIcon} ${isDark ? styles.statusIconDark : ""}`}
              />
              <MdBatteryFull
                className={`${styles.statusIcon} ${isDark ? styles.statusIconDark : ""}`}
              />
            </div>
          </div>
        )}

        {/* Safe Area Content */}
        <div className={styles.safeArea}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
