"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdChatBubbleOutline,
  MdOutlineNoteAlt,
  MdVolumeUp,
  MdVolumeOff,
  MdMic,
  MdMicOff,
  MdFrontHand,
  MdCallEnd,
  MdHeadsetMic,
  MdChevronLeft,
  MdChevronRight,
  MdSend,
  MdArticle,
  MdEdit,
  MdClose,
  MdBuild,
} from "react-icons/md";
import styles from "./CallScreenMock.module.css";

interface CallScreenMockProps {
  name?: string;
  emoji?: string;
  subtitle?: string;
  onEndCall?: () => void;
}

export function CallScreenMock({
  name = "VAGINA",
  emoji,
  subtitle = "ADVANCED VAGINAL INTELLIGENCE",
  onEndCall,
}: CallScreenMockProps) {
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isInterruptActive, setIsInterruptActive] = useState(false);

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Mock audio visualization levels
  const [levels, setLevels] = useState<number[]>(new Array(12).fill(0.15));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setLevels(new Array(12).fill(0).map(() => 0.15 + Math.random() * 0.7));
      } else {
        setLevels(new Array(12).fill(0.15));
      }
    }, 150);
    return () => clearInterval(interval);
  }, [isMuted]);

  const goToChat = () => setActivePageIndex(0);
  const goToCall = () => setActivePageIndex(1);
  const goToNotepad = () => setActivePageIndex(2);

  return (
    <div className={styles.screen}>
      <div className={styles.overlay} />
      <motion.div
        className={styles.pageView}
        animate={{ x: `-${activePageIndex * 33.3333}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const swipeThreshold = 50;
          if (info.offset.x > swipeThreshold && activePageIndex > 0) {
            setActivePageIndex(activePageIndex - 1);
          } else if (info.offset.x < -swipeThreshold && activePageIndex < 2) {
            setActivePageIndex(activePageIndex + 1);
          }
        }}
      >
        {/* Chat Pane */}
        <div className={styles.page}>
          <div className={styles.paneHeader}>
            <div />
            <span className={styles.paneTitle}>チャット</span>
            <button className={styles.navAction} onClick={goToCall}>
              <span>通話画面</span>
              <MdChevronRight />
            </button>
          </div>
          <div className={styles.chatList}>
            <div className={`${styles.chatBubble} ${styles.aiBubble}`}>
              接続されました。何かお手伝いしましょうか？
            </div>
            <div className={`${styles.chatBubble} ${styles.userBubble}`}>
              今日のスケジュールを確認して。
            </div>
            <div className={styles.toolBadge}>
              <MdBuild size={12} />
              <span>calendar_list_events</span>
              <MdChevronRight size={12} />
            </div>
            <div className={`${styles.chatBubble} ${styles.aiBubble}`}>
              現在、カレンダーを確認しています...
            </div>
          </div>
          <div className={styles.chatInputArea}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="メッセージを入力..."
            />
            <button className={styles.controlButton}>
              <MdSend size={24} color="#6C63FF" />
            </button>
          </div>
        </div>

        {/* Call Pane (Home) */}
        <div className={styles.page}>
          <div className={styles.centerContent}>
            {emoji ? (
              <div className={styles.agentIcon}>{emoji}</div>
            ) : (
              <div className={styles.agentIcon} style={{ color: "#6C63FF" }}>
                <MdHeadsetMic />
              </div>
            )}
            <h2 className={styles.agentName}>{name}</h2>
            {subtitle && <p className={styles.agentSubtitle}>{subtitle}</p>}

            <div className={styles.timer}>{formatTime(seconds)}</div>

            <motion.div className={styles.visualizer} initial={false}>
              {levels.map((level, i) => (
                <motion.div
                  key={i}
                  className={styles.bar}
                  animate={{
                    height: `${level * 100}%`,
                    backgroundColor: isMuted
                      ? "rgba(184, 184, 209, 0.3)"
                      : `rgba(108, 99, 255, ${0.6 + level * 0.4})`,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <div className={styles.controlsContainer}>
            <div className={styles.controlsContent}>
              {/* Row 1: Chat and Notepad */}
              <div className={styles.controlRow}>
                <button className={styles.controlButton} onClick={goToChat}>
                  <div className={styles.buttonIconWrapper}>
                    <MdChatBubbleOutline />
                  </div>
                  <span className={styles.buttonLabel}>チャット</span>
                </button>
                <button className={styles.controlButton} onClick={goToNotepad}>
                  <div className={styles.buttonIconWrapper}>
                    <MdOutlineNoteAlt />
                  </div>
                  <span className={styles.buttonLabel}>ノートパッド</span>
                </button>
              </div>

              {/* Row 2: Speaker, Mute, Interrupt */}
              <div className={styles.controlRow}>
                <button
                  className={styles.controlButton}
                  onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                  style={{ color: isSpeakerMuted ? "#FFE66D" : "#b8b8d1" }}
                >
                  <div
                    className={`${styles.buttonIconWrapper} ${styles.speaker}`}
                    data-active={isSpeakerMuted}
                  >
                    {isSpeakerMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                  </div>
                  <span className={styles.buttonLabel}>スピーカー</span>
                </button>
                <button
                  className={styles.controlButton}
                  onClick={() => setIsMuted(!isMuted)}
                  style={{ color: isMuted ? "#FF6B6B" : "#b8b8d1" }}
                >
                  <div
                    className={`${styles.buttonIconWrapper} ${styles.mute}`}
                    data-active={isMuted}
                  >
                    {isMuted ? <MdMicOff /> : <MdMic />}
                  </div>
                  <span className={styles.buttonLabel}>消音</span>
                </button>
                <button
                  className={styles.controlButton}
                  onClick={() => {
                    setIsInterruptActive(true);
                    setTimeout(() => setIsInterruptActive(false), 300);
                  }}
                  style={{ color: isInterruptActive ? "#6C63FF" : "#b8b8d1" }}
                >
                  <div
                    className={styles.buttonIconWrapper}
                    data-active={isInterruptActive}
                  >
                    <MdFrontHand />
                  </div>
                  <span className={styles.buttonLabel}>割込み</span>
                </button>
              </div>

              {/* End Call FAB */}
              <button
                className={styles.endCallButton}
                onClick={onEndCall}
                aria-label="End Call"
              >
                <MdCallEnd />
              </button>
            </div>
          </div>
        </div>

        {/* Notepad Pane */}
        <div className={styles.page}>
          <div className={styles.paneHeader}>
            <button className={styles.navAction} onClick={goToCall}>
              <MdChevronLeft />
              <span>通話画面</span>
            </button>
            <span className={styles.paneTitle}>ノートパッド</span>
            <div />
          </div>
          <div className={styles.tabBar}>
            <div className={styles.tab} data-active="true">
              <MdArticle size={14} />
              <span>meeting_notes.md</span>
            </div>
            <div className={styles.tab}>
              <MdArticle size={14} />
              <span>todo_list.txt</span>
            </div>
          </div>
          <div className={styles.notepadContent}>
            <div className={styles.notepadHeader}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MdArticle size={18} color="#B8B8D1" />
                <span style={{ fontWeight: 600 }}>meeting_notes.md</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <MdEdit size={20} color="#B8B8D1" />
                <MdClose size={20} color="#B8B8D1" />
              </div>
            </div>
            <div className={styles.notepadBody}>
              # ミーティングノート {"\n\n"}
              ## 今日の議題 {"\n"}- AIエージェントの通話UI刷新 {"\n"}-
              左右スワイプによる画面遷移の実装 {"\n"}-
              ガラスモーフィズムによるリッチなデザイン {"\n\n"}
              ## 決定事項 {"\n"}
              1. 左右に3つのパネルを配置する {"\n"}
              2. 中央をメインの通話画面とする {"\n"}
              3. 左がチャット、右がノートパッド
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
