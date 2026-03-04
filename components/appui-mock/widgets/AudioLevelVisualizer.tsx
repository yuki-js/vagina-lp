import styles from "./AudioLevelVisualizer.module.css";

interface AudioLevelVisualizerProps {
  level?: number;
  isMuted?: boolean;
  isConnected?: boolean;
  barCount?: number;
  height?: number;
}

export function AudioLevelVisualizer({
  level = 0.5,
  isMuted = false,
  isConnected = true,
  barCount = 12,
  height = 80,
}: AudioLevelVisualizerProps) {
  const bars = Array.from({ length: barCount }, (_, i) => {
    const centerOffset = Math.abs(i - barCount / 2) / (barCount / 2);
    const falloff = 1 - centerOffset * 0.5;
    const barLevel = isMuted ? 0 : Math.pow(level, 0.9) * falloff;
    const pct = Math.max(0.15, Math.min(1, barLevel));
    
    return (
      <div
        key={i}
        className={styles.bar}
        style={{
          height: `${height * pct}px`,
          backgroundColor: isMuted
            ? "rgba(184, 184, 209, 0.3)"
            : isConnected
            ? `rgba(108, 99, 255, ${0.8 + barLevel * 0.2})`
            : "rgba(184, 184, 209, 0.5)",
        }}
      />
    );
  });

  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      {bars}
    </div>
  );
}
