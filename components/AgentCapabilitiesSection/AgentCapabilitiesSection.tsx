import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { WindowMock } from "../WindowMock/WindowMock";
import styles from "./AgentCapabilitiesSection.module.css";

// Premium Abstract SVGs
const HumanFace = () => (
  <svg viewBox="0 0 100 100" className={styles.faceIcon}>
    <circle cx="50" cy="50" r="50" fill="#f8f9fa" />
    <path d="M 20 100 Q 50 50 80 100" fill="#6c63ff" opacity="0.8" />
    <circle cx="50" cy="45" r="22" fill="#6c63ff" opacity="0.9" />
  </svg>
);

const VoiceAgentFace = () => (
  <svg viewBox="0 0 100 100" className={styles.faceIcon}>
    <defs>
      <linearGradient id="aiFace" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#6c63ff" />
        <stop offset="100%" stopColor="#00d9ff" />
      </linearGradient>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="48"
      fill="none"
      stroke="url(#aiFace)"
      strokeWidth="2"
      strokeDasharray="6 4"
    />

    <circle cx="50" cy="50" r="42" fill="#ffffff" />
    <circle cx="50" cy="50" r="38" fill="url(#aiFace)" opacity="0.15" />
    <circle cx="35" cy="45" r="5" fill="url(#aiFace)" />
    <circle cx="65" cy="45" r="5" fill="url(#aiFace)" />
    <rect x="42" y="65" width="16" height="4" rx="2" fill="url(#aiFace)" />
  </svg>
);

const BrainFace = () => (
  <svg viewBox="0 0 100 100" className={styles.faceIcon}>
    <defs>
      <linearGradient id="brainFace" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#00d9ff" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="48"
      fill="#ffffff"
      stroke="url(#brainFace)"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="38" fill="url(#brainFace)" opacity="0.15" />
    <circle cx="50" cy="40" r="14" fill="url(#brainFace)" opacity="0.9" />
    <circle cx="30" cy="65" r="7" fill="url(#brainFace)" opacity="0.8" />
    <circle cx="70" cy="65" r="7" fill="url(#brainFace)" opacity="0.8" />
    <path
      d="M 30 65 L 50 40 L 70 65"
      stroke="url(#brainFace)"
      strokeWidth="3"
      fill="none"
      strokeDasharray="3 3"
      opacity="0.7"
    />
  </svg>
);

const WiFiWaveRight = () => (
  <svg width="40" height="60" viewBox="0 0 40 60" className={styles.waves}>
    <path
      d="M 5 20 Q 15 30 5 40"
      className={`${styles.waveArc} ${styles.wave1}`}
    />
    <path
      d="M 15 10 Q 30 30 15 50"
      className={`${styles.waveArc} ${styles.wave2}`}
    />
    <path
      d="M 25 0 Q 45 30 25 60"
      className={`${styles.waveArc} ${styles.wave3}`}
    />
  </svg>
);

const WiFiWaveLeft = () => (
  <svg
    width="40"
    height="60"
    viewBox="0 0 40 60"
    className={styles.waves}
    style={{ transform: "scaleX(-1)" }}
  >
    <path
      d="M 5 20 Q 15 30 5 40"
      className={`${styles.waveArc} ${styles.wave1}`}
    />
    <path
      d="M 15 10 Q 30 30 15 50"
      className={`${styles.waveArc} ${styles.wave2}`}
    />
    <path
      d="M 25 0 Q 45 30 25 60"
      className={`${styles.waveArc} ${styles.wave3}`}
    />
  </svg>
);

const ActionCard = ({
  children,
  index,
  progress,
  align = "center",
}: {
  children: React.ReactNode;
  index: number;
  progress: any;
  align?: "left" | "center" | "right";
}) => {
  const alignClass =
    align === "left"
      ? styles.alignLeft
      : align === "right"
        ? styles.alignRight
        : styles.alignCenter;

  // Stagger start points for 7 items
  const start = index * 0.1;
  const end = start + 0.05;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(10px)", "blur(0px)"],
  );

  return (
    <motion.div
      style={{ opacity, scale, filter }}
      className={`${styles.actionCardWrapper} ${alignClass}`}
    >
      {children}
    </motion.div>
  );
};

export function AgentCapabilitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  // For the tracking line
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);

  // Scroll gimmicks for the entire WindowMock on the right column
  const windowOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1]);
  const windowY = useTransform(smoothProgress, [0.4, 0.7], [100, 0]);
  const windowScale = useTransform(smoothProgress, [0.4, 0.7], [0.95, 1]);

  return (
    <section ref={containerRef} id="capabilities" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <h2 className={styles.heading}>
            Need more intelligence? <strong>Use Recursive Agent.</strong>
          </h2>
          <p className={styles.subheading}>
            VAGINA runs a real-time Voice Agent that handles conversation, and
            recursively calls a high-intelligence Text Agent for complex logic.
            Both agents operate concurrently as a unified hybrid system.
          </p>
        </ScrollReveal>

        <div className={styles.interactionContainer}>
          <div className={styles.stickyPersonas}>
            {/* Human */}
            <div className={styles.persona}>
              <div className={styles.faceWrapper}>
                <HumanFace />
              </div>
              <span className={styles.personaName}>Human User</span>
            </div>

            <WiFiWaveLeft />

            {/* Voice Agent */}
            <div className={styles.persona}>
              <div className={styles.faceWrapper}>
                <div className={styles.rotatingFace}>
                  <VoiceAgentFace />
                </div>
              </div>
              <span className={styles.personaName}>Voice Agent</span>
            </div>

            <WiFiWaveRight />

            {/* Brain Agent */}
            <div className={styles.persona}>
              <div className={styles.faceWrapper}>
                <BrainFace />
              </div>
              <span className={styles.personaName}>Text Agent</span>
            </div>
          </div>

          <div className={styles.twoColumnGrid}>
            <div className={styles.leftColumn}>
              {/* Scrolling Abstract Data Flow */}
              <div className={styles.threadFlow}>
                {/* Dynamic Tracking Line */}
                <motion.div
                  className={styles.trackingLine}
                  style={{ height: lineHeight }}
                />

                <ActionCard index={0} progress={smoothProgress} align="left">
                  <div className={styles.glassCard}>
                    Extract action items and draft a follow-up email from the
                    sales call.
                  </div>
                </ActionCard>

                <ActionCard index={1} progress={smoothProgress} align="center">
                  <div className={styles.glassCard}>
                    Got it. I'll recruit the Deep Intelligence Agent to analyze
                    the transcript.
                  </div>
                </ActionCard>

                <ActionCard index={2} progress={smoothProgress} align="center">
                  <div className={styles.pillBadge}>
                    <span className={styles.spinner}></span>
                    Calling Deep Intelligence Agent
                  </div>
                </ActionCard>

                <ActionCard index={3} progress={smoothProgress} align="right">
                  <div className={`${styles.glassCard} ${styles.glowingCard}`}>
                    Processing CRM context and 45-minute call transcript...
                  </div>
                </ActionCard>

                <ActionCard index={4} progress={smoothProgress} align="right">
                  <div className={`${styles.glassCard} ${styles.glowingCard}`}>
                    I've synthesized the required items.
                  </div>
                </ActionCard>

                <ActionCard index={5} progress={smoothProgress} align="center">
                  <div className={styles.glassCard}>
                    Thanks. Saving the results directly to your Notepad.
                  </div>
                </ActionCard>

                <ActionCard index={6} progress={smoothProgress} align="center">
                  <div className={styles.pillBadge}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className={styles.checkIcon}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    meeting_notes.md updated
                  </div>
                </ActionCard>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <motion.div
                style={{
                  opacity: windowOpacity,
                  y: windowY,
                  scale: windowScale,
                }}
              >
                <WindowMock title="meeting_notes.md">
                  <div className={styles.notepadBody}>
                    <h3># Action Items</h3>
                    <div className={styles.checkItem}>
                      <div className={styles.checkCircle}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Draft follow-up email to stakeholders
                    </div>
                    <div className={styles.checkItem}>
                      <div className={styles.checkCircle}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Update CRM with new budget requirements
                    </div>

                    <div className={styles.draftCard}>
                      <strong>Email Draft:</strong>
                      <br />
                      <br />
                      Hi Team,
                      <br />
                      <br />
                      Great call today. As discussed, we are adjusting the Q3
                      budget requirements and I will be sending over the updated
                      metrics by Friday.
                      <br />
                      <br />
                      Best,
                      <br />
                      VAGINA Agent
                    </div>
                  </div>
                </WindowMock>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
