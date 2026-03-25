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

interface NotepadRendererProps {
  content: string;
}

function NotepadRenderer({ content }: NotepadRendererProps) {
  const lines = content.split("\n");

  return (
    <div className={styles.notepadContentInner}>
      {lines.map((line, i) => {
        // H1: # heading
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className={styles.notepadH1}>
              {line.slice(2)}
            </h1>
          );
        }
        // H2: ## heading
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className={styles.notepadH2}>
              {line.slice(3)}
            </h2>
          );
        }
        // Unordered list item: - or *
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={i} className={styles.notepadLi}>
              {renderInline(line.slice(2))}
            </li>
          );
        }
        // Checkbox: [ ] or [x]
        if (line.match(/^\[.\]/)) {
          const checked = line.startsWith("[x]");
          const text = line.slice(4);
          return (
            <div key={i} className={styles.notepadCheckbox}>
              <span className={checked ? styles.checked : styles.unchecked}>
                {checked ? "✓" : "○"}
              </span>
              <span>{renderInline(text)}</span>
            </div>
          );
        }
        // Empty line
        if (line.trim() === "") {
          return <br key={i} />;
        }
        // Regular text
        return (
          <p key={i} className={styles.notepadP}>
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold** and *italic*
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }
    parts.push(remaining);
    break;
  }

  return parts.length > 0 ? parts : text;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
}

interface CallScreenMockProps {
  name?: string;
  emoji?: string;
  subtitle?: string;
  onEndCall?: () => void;
  externalPageIndex?: number;
  streamedMessages?: ChatMessage[];
  streamedNotepad?: string;
}

export function CallScreenMock({
  name = "VAGINA",
  emoji,
  subtitle = "ADVANCED VAGINAL INTELLIGENCE",
  onEndCall,
  externalPageIndex,
  streamedMessages = [],
  streamedNotepad,
}: CallScreenMockProps) {
  const [internalPageIndex, setInternalPageIndex] = useState(1);
  const activePageIndex =
    externalPageIndex !== undefined ? externalPageIndex : internalPageIndex;
  const setActivePageIndex = (index: number | ((prev: number) => number)) => {
    if (externalPageIndex === undefined) {
      setInternalPageIndex(index);
    }
  };
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
            {streamedMessages.length === 0 ? (
              <div className={styles.emptyChat}>
                <span>スクロールしてAIとのチャットを開始</span>
              </div>
            ) : (
              streamedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.chatBubble} ${msg.isUser ? styles.userBubble : styles.aiBubble}`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className={styles.cursor}>|</span>}
                </div>
              ))
            )}
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
              <span>schedule.txt</span>
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
              {streamedNotepad ? (
                <NotepadRenderer content={streamedNotepad} />
              ) : (
                <span className={styles.notepadPlaceholder}>
                  スクロールすると、AIが自動的にノートに記録します
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
