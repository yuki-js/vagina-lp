import styles from "./CallPane.module.css";
import { CallMainContent } from "./CallMainContent";
import { ControlPanel } from "./ControlPanel";

interface CallPaneProps {
  onChatPressed?: () => void;
  onNotepadPressed?: () => void;
  hideNavigationButtons?: boolean;
  isCallActive?: boolean;
  isConnecting?: boolean;
  isConnected?: boolean;
  callDuration?: number;
  inputLevel?: number;
  isMuted?: boolean;
  speakerMuted?: boolean;
}

export function CallPane({
  onChatPressed,
  onNotepadPressed,
  hideNavigationButtons = false,
  isCallActive = false,
  isConnecting = false,
  isConnected = false,
  callDuration = 0,
  inputLevel = 0.5,
  isMuted = false,
  speakerMuted = false,
}: CallPaneProps) {
  return (
    <div className={styles.container}>
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <CallMainContent
          isCallActive={isCallActive}
          isConnecting={isConnecting}
          isConnected={isConnected}
          callDuration={callDuration}
          inputLevel={inputLevel}
          isMuted={isMuted}
        />
      </div>

      {/* Control Panel */}
      <ControlPanel
        onChatPressed={onChatPressed}
        onNotepadPressed={onNotepadPressed}
        isMuted={isMuted}
        speakerMuted={speakerMuted}
        isCallActive={isCallActive}
        hideNavigationButtons={hideNavigationButtons}
      />
    </div>
  );
}
