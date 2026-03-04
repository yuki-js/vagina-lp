import styles from "./WindowMock.module.css";

interface WindowMockProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function WindowMock({ children, title, className }: WindowMockProps) {
  return (
    <div className={`${styles.window} ${className ?? ""}`}>
      <div className={styles.titlebar}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          {/* Minimize */}
          <span className={styles.controlBtn} aria-hidden>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="1" y1="5" x2="9" y2="5" />
            </svg>
          </span>
          {/* Maximize */}
          <span className={styles.controlBtn} aria-hidden>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="1" y="1" width="8" height="8" rx="0.5" />
            </svg>
          </span>
          {/* Close */}
          <span className={`${styles.controlBtn} ${styles.closeBtn}`} aria-hidden>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
            </svg>
          </span>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
