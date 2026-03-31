import React, { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { PhoneMock } from "../PhoneMock/PhoneMock";
import { CallScreenMock, ChatMessage } from "../CallScreenMock/CallScreenMock";
import styles from "./CallExperienceSection.module.css";

const tabs = [
  {
    id: "call",
    title: "Voice Call",
    description: "Experience real-time voice conversations with AGI agents.",
  },
  {
    id: "chat",
    title: "AGI Chat",
    description: "Bidirectional AGI conversation with tool execution.",
  },
  {
    id: "notepad",
    title: "Auto Notepad",
    description: "AGI automatically records important details to your notes.",
  },
];

// Scroll thresholds: 1.0 = section end (600vh)
const SCROLL_THRESHOLDS = {
  callEnd: 0.2,
  chatEnd: 0.4,
  notepadEnd: 0.6,
} as const;

const NOTEPAD_CONTENT = `# Lunch Meeting

## Reservation Details
- **Date**: Next Tuesday
- **Time**: 13:00
- **Restaurant**: Italian Restaurant

## Status
[ ] Confirm reservation
[ ] Add to calendar
`;

const CONVERSATION = [
  { id: "ai-0", text: "How can I help you?", isUser: false },
  {
    id: "user-1",
    text: "Book an Italian restaurant for lunch next Tuesday.",
    isUser: true,
  },
  { id: "ai-1", text: "Got it. Lunch on Tuesday next week.", isUser: false },
  { id: "ai-2", text: "Searching for Italian restaurant.", isUser: false },
  {
    id: "ai-3",
    text: "Found a reservation at 1 PM. Should I confirm it?",
    isUser: false,
  },
  { id: "user-2", text: "Yes, please.", isUser: true },
  {
    id: "ai-4",
    text: "Reservation confirmed. I'll record it in the notepad.",
    isUser: false,
  },
  {
    id: "ai-5",
    text: "Done. I've added it to meeting_notes.md.",
    isUser: false,
  },
];

export function CallExperienceSection() {
  const [clipRadius, setClipRadius] = useState("0%");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(1); // 0=chat, 1=call, 2=notepad
  const [streamedMessages, setStreamedMessages] = useState<ChatMessage[]>([]);
  const [streamedNotepad, setStreamedNotepad] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStartedStreaming = useRef(false);
  const hasStartedNotepad = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Logic for clipRadius
      const animOffset = 800;
      const clipProgress = (scrollY - sectionTop + animOffset) / sectionHeight;
      const clampedClip = Math.max(0, Math.min(1, clipProgress));
      setClipRadius(`${clampedClip * 800}%`);

      // Unified scroll progress (0 to 1 as user scrolls through section)
      // 0.0 = section start, 1.0 = section end (600vh)
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY - sectionTop) / sectionHeight),
      );

      // Update tab index for panel description
      const newTabIndex =
        scrollProgress >= SCROLL_THRESHOLDS.notepadEnd
          ? 2
          : scrollProgress >= SCROLL_THRESHOLDS.callEnd
            ? 1
            : 0;
      if (newTabIndex !== activeTabIndex) {
        setActiveTabIndex(newTabIndex);
      }

      // Page transition logic
      if (scrollProgress < SCROLL_THRESHOLDS.callEnd) {
        // Call screen
        setPageIndex(1);
        hasStartedStreaming.current = false;
        hasStartedNotepad.current = false;
        setStreamedMessages([]);
        setStreamedNotepad("");
      } else if (scrollProgress < SCROLL_THRESHOLDS.chatEnd) {
        // Chat screen with streaming
        setPageIndex(0);
        hasStartedNotepad.current = false;
        setStreamedNotepad("");

        // Start streaming at callEnd threshold
        if (!hasStartedStreaming.current) {
          hasStartedStreaming.current = true;
        }

        // Calculate stream progress (0 to 1 between callEnd and chatEnd)
        const streamProgress =
          (scrollProgress - SCROLL_THRESHOLDS.callEnd) /
          (SCROLL_THRESHOLDS.chatEnd - SCROLL_THRESHOLDS.callEnd);
        const clampedStreamProgress = Math.max(0, Math.min(1, streamProgress));

        // Calculate total characters in conversation
        const totalChars = CONVERSATION.reduce(
          (sum, msg) => sum + msg.text.length,
          0,
        );
        const charsToShow = Math.floor(clampedStreamProgress * totalChars);

        // Build messages based on chars shown
        const messages: ChatMessage[] = [];
        let charCount = 0;

        for (const msg of CONVERSATION) {
          if (charsToShow > charCount) {
            const msgChars = Math.min(msg.text.length, charsToShow - charCount);
            messages.push({
              id: msg.id,
              text: msg.text.slice(0, msgChars),
              isUser: msg.isUser,
              isStreaming: msgChars < msg.text.length,
            });
            charCount += msgChars;
          } else {
            break;
          }
        }

        setStreamedMessages(messages);
      } else if (scrollProgress >= SCROLL_THRESHOLDS.chatEnd) {
        // Notepad screen with streaming
        setPageIndex(2);
        hasStartedStreaming.current = false;
        setStreamedMessages([]);

        // Start notepad streaming at chatEnd threshold
        if (!hasStartedNotepad.current) {
          hasStartedNotepad.current = true;
        }

        // Calculate notepad stream progress (0 to 1 from chatEnd to notepadEnd)
        const notepadProgress =
          (scrollProgress - SCROLL_THRESHOLDS.chatEnd) /
          (SCROLL_THRESHOLDS.notepadEnd - SCROLL_THRESHOLDS.chatEnd);
        const clampedNotepadProgress = Math.max(
          0,
          Math.min(1, notepadProgress),
        );
        const charsToShow = Math.floor(
          clampedNotepadProgress * NOTEPAD_CONTENT.length,
        );
        setStreamedNotepad(NOTEPAD_CONTENT.slice(0, charsToShow));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTabIndex]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        className={`${styles.expandingBg} ${styles.gradient}`}
        style={{ "--clip-radius": clipRadius } as React.CSSProperties}
      />
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <h2 className={styles.heading}>
            Talk, Think, Let AGI Handle the Rest
          </h2>

          <p className={styles.description}>
            Focus on expressing your ideas while our AGI agent handles
            note-taking, organization, and follow-up actions automatically.
          </p>
        </ScrollReveal>

        <div className={styles.stickyContainer}>
          <div className={styles.preview}>
            <PhoneMock size="xlarge" isDark>
              <CallScreenMock
                externalPageIndex={pageIndex}
                streamedMessages={streamedMessages}
                streamedNotepad={streamedNotepad}
              />
            </PhoneMock>

            <div className={styles.panel}>
              <div key={activeTabIndex} className={styles.panelContent}>
                <h3 className={styles.panelTitle}>
                  {tabs[activeTabIndex].title}
                </h3>
                <p className={styles.panelDescription}>
                  {tabs[activeTabIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
