import styles from "./CallMainContent.module.css";
import { AudioLevelVisualizer } from "./AudioLevelVisualizer";

interface CallMainContentProps {
  isCallActive?: boolean;
  isConnecting?: boolean;
  isConnected?: boolean;
  callDuration?: number;
  inputLevel?: number;
  isMuted?: boolean;
  appName?: string;
  tagline?: string;
  icon?: string;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function CallMainContent({
  isCallActive = false,
  isConnecting = false,
  isConnected = false,
  callDuration = 0,
  inputLevel = 0.5,
  isMuted = false,
  appName = "VAGINA",
  tagline = "Voice AGI Notepad Agent",
  icon = "🎧",
}: CallMainContentProps) {
  return (
    <div className={styles.container}>
      {/* Logo/Icon Area */}
      <div className={styles.logoArea}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.appName}>{appName}</h2>
        <p className={styles.tagline}>{tagline}</p>
      </div>

      {/* Call Duration (only when active) */}
      {isCallActive && (
        <>
          <div className={styles.duration}>{formatDuration(callDuration)}</div>

          {/* Audio Visualizer */}
          <div className={styles.visualizerArea}>
            <AudioLevelVisualizer
              level={inputLevel}
              isMuted={isMuted}
              isConnected={isConnected}
              barCount={12}
              height={60}
            />
          </div>
        </>
      )}

      {/* Connecting Indicator */}
      {isConnecting && (
        <div className={styles.connectingArea}>
          <div className={styles.spinner} />
          <p className={styles.connectingText}>接続中...</p>
        </div>
      )}
    </div>
  );
}
