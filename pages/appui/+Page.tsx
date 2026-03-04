import React, { useState } from "react";
import styles from "./+Page.module.css";
import { WindowMock } from "../../components/WindowMock/WindowMock";
import { CallPane } from "../../components/appui-mock/widgets/CallPane";
import { ChatPane } from "../../components/appui-mock/widgets/ChatPane";
import { NotepadPane } from "../../components/appui-mock/widgets/NotepadPane";

type ViewMode = "call" | "chat" | "notepad" | "three-column";

export default function AppUiPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("call");
  const [callDuration, setCallDuration] = useState(42);
  const [inputLevel, setInputLevel] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerMuted, setSpeakerMuted] = useState(false);

  // Auto-increment call duration
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate input level
  React.useEffect(() => {
    const interval = setInterval(() => {
      setInputLevel(Math.random() * 0.8 + 0.2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (viewMode) {
      case "chat":
        return (
          <ChatPane
            onBackPressed={() => setViewMode("call")}
            isCallActive={true}
          />
        );
      case "notepad":
        return (
          <NotepadPane
            onBackPressed={() => setViewMode("call")}
            isCallActive={true}
          />
        );
      case "three-column":
        return (
          <div className={styles.threeColumnLayout}>
            <div className={styles.pane} style={{ flex: "40%" }}>
              <ChatPane hideBackButton={true} isCallActive={true} />
            </div>
            <div className={styles.pane} style={{ flex: "30%" }}>
              <CallPane
                hideNavigationButtons={true}
                isCallActive={true}
                isConnected={true}
                callDuration={callDuration}
                inputLevel={inputLevel}
                isMuted={isMuted}
                speakerMuted={speakerMuted}
              />
            </div>
            <div className={styles.pane} style={{ flex: "40%" }}>
              <NotepadPane hideBackButton={true} isCallActive={true} />
            </div>
          </div>
        );
      case "call":
      default:
        return (
          <CallPane
            onChatPressed={() => setViewMode("chat")}
            onNotepadPressed={() => setViewMode("notepad")}
            isCallActive={true}
            isConnected={true}
            callDuration={callDuration}
            inputLevel={inputLevel}
            isMuted={isMuted}
            speakerMuted={speakerMuted}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mockContent}>
        <WindowMock title="VAGINA - Voice AGI Notepad Agent">
          <div>{renderContent()}</div>
        </WindowMock>

        {/* View Mode Selector */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${viewMode === "call" ? styles.active : ""}`}
            onClick={() => setViewMode("call")}
          >
            Call (Mobile)
          </button>
          <button
            className={`${styles.controlBtn} ${viewMode === "chat" ? styles.active : ""}`}
            onClick={() => setViewMode("chat")}
          >
            Chat
          </button>
          <button
            className={`${styles.controlBtn} ${viewMode === "notepad" ? styles.active : ""}`}
            onClick={() => setViewMode("notepad")}
          >
            Notepad
          </button>
          <button
            className={`${styles.controlBtn} ${viewMode === "three-column" ? styles.active : ""}`}
            onClick={() => setViewMode("three-column")}
          >
            Three Column (Wide)
          </button>
        </div>
      </div>
    </div>
  );
}
