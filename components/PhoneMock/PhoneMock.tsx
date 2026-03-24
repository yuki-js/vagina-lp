import { MdSignalCellularAlt, MdWifi, MdBatteryFull } from "react-icons/md";
import styles from "./PhoneMock.module.css";

interface PhoneMockProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  showStatusBar?: boolean;
}

export function PhoneMock({ children, className, size = "medium", showStatusBar = true }: PhoneMockProps) {
  const sizeClass = styles[size];
  
  // Get current time for status bar
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  
  return (
    <div className={`${styles.phone} ${sizeClass} ${className ?? ""}`}>
      <div className={styles.screen}>
        <div className={styles.notch} />
        
        {/* Status Bar */}
        {showStatusBar && (
          <div className={styles.statusBar}>
            <div className={styles.statusLeft}>
              <span className={styles.time}>{time}</span>
            </div>
            <div className={styles.statusRight}>
              <MdSignalCellularAlt className={styles.statusIcon} />
              <MdWifi className={styles.statusIcon} />
              <MdBatteryFull className={styles.statusIcon} />
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
