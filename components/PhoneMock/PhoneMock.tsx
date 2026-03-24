import styles from "./PhoneMock.module.css";

interface PhoneMockProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

export function PhoneMock({ children, className, size = "medium" }: PhoneMockProps) {
  const sizeClass = styles[size];
  return (
    <div className={`${styles.phone} ${sizeClass} ${className ?? ""}`}>
      <div className={styles.screen}>
        <div className={styles.notch} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
