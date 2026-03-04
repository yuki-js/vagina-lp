import styles from "./ControlPanel.module.css";
import { ControlButton } from "./ControlButton";

interface ControlPanelProps {
  onChatPressed?: () => void;
  onNotepadPressed?: () => void;
  onSpeakerToggle?: () => void;
  onMuteToggle?: () => void;
  onInterrupt?: () => void;
  onEndCall?: () => void;
  isMuted?: boolean;
  speakerMuted?: boolean;
  isCallActive?: boolean;
  hideNavigationButtons?: boolean;
}

export function ControlPanel({
  onChatPressed,
  onNotepadPressed,
  onSpeakerToggle,
  onMuteToggle,
  onInterrupt,
  onEndCall,
  isMuted = false,
  speakerMuted = false,
  isCallActive = false,
  hideNavigationButtons = false,
}: ControlPanelProps) {
  return (
    <div className={styles.container}>
      {/* Navigation Buttons Row */}
      {!hideNavigationButtons && (
        <>
          <div className={styles.row}>
            <div className={styles.item}>
              <ControlButton
                icon="💬"
                label="チャット"
                onClick={onChatPressed}
              />
            </div>
            <div className={styles.item}>
              <ControlButton
                icon="📝"
                label="ノートパッド"
                onClick={onNotepadPressed}
              />
            </div>
          </div>
          <div className={styles.spacer} />
        </>
      )}

      {/* Control Buttons */}
      {hideNavigationButtons ? (
        <>
          {/* Wide Layout: 2x2 Grid */}
          <div className={styles.row}>
            <div className={styles.item}>
              <ControlButton
                icon={speakerMuted ? "🔇" : "🔊"}
                label="スピーカー"
                isActive={speakerMuted}
                activeColor="warning"
                onClick={onSpeakerToggle}
              />
            </div>
            <div className={styles.item}>
              <ControlButton
                icon={isMuted ? "🎤‍" : "🎤"}
                label="消音"
                isActive={isMuted}
                activeColor="error"
                onClick={onMuteToggle}
              />
            </div>
          </div>
          <div className={styles.spacer} />
          <div className={styles.row}>
            <div className={styles.item}>
              <ControlButton
                icon="✋"
                label="割込み"
                enabled={isCallActive}
                onClick={onInterrupt}
              />
            </div>
            <div className={styles.item}>
              <ControlButton
                icon="🖼️"
                label="PiP"
              />
            </div>
          </div>
        </>
      ) : (
        /* Mobile Layout: Single Row */
        <div className={styles.row}>
          <div className={styles.item}>
            <ControlButton
              icon={speakerMuted ? "🔇" : "🔊"}
              label="スピーカー"
              isActive={speakerMuted}
              activeColor="warning"
              onClick={onSpeakerToggle}
            />
          </div>
          <div className={styles.item}>
            <ControlButton
              icon={isMuted ? "🎤‍" : "🎤"}
              label="消音"
              isActive={isMuted}
              activeColor="error"
              onClick={onMuteToggle}
            />
          </div>
          <div className={styles.item}>
            <ControlButton
              icon="✋"
              label="割込み"
              enabled={isCallActive}
              onClick={onInterrupt}
            />
          </div>
        </div>
      )}

      <div className={styles.spacer} />

      {/* Call End Button */}
      <div className={styles.callButtonArea}>
        <button className={styles.callEndButton} onClick={onEndCall}>
          📞
        </button>
      </div>
    </div>
  );
}
