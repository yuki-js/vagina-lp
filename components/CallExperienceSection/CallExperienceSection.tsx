import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { PhoneMock } from "../PhoneMock/PhoneMock";
import { CallScreenMock } from "../CallScreenMock/CallScreenMock";
import styles from "./CallExperienceSection.module.css";

const tabs = [
  {
    id: "call",
    title: "Voice Call",
    description: "Experience real-time voice conversations with AI agents.",
  },
];

export function CallExperienceSection() {
  const [clipRadius, setClipRadius] = useState("0%");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

      // Logic for tabs
      const scrollStart = sectionTop - viewportHeight / 2;
      const scrollEnd = sectionTop + sectionHeight - viewportHeight / 2;
      const tabProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
      const clampedTabProgress = Math.max(0, Math.min(1, tabProgress));
      const newTabIndex = Math.floor(clampedTabProgress * tabs.length);
      const boundedTabIndex = Math.min(newTabIndex, tabs.length - 1);

      if (boundedTabIndex !== activeTabIndex) {
        setActiveTabIndex(boundedTabIndex);
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.heading}
          >
            Talk, Think, Let AI Handle the Rest
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.description}
          >
            Focus on expressing your ideas while our AI agent handles
            note-taking, organization, and follow-up actions automatically.
          </motion.p>
        </ScrollReveal>

        <div className={styles.stickyContainer}>
          <motion.div
            className={styles.preview}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PhoneMock size="xlarge">
              <CallScreenMock />
            </PhoneMock>

            <div className={styles.panel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={styles.panelTitle}>
                    {tabs[activeTabIndex].title}
                  </h3>
                  <p className={styles.panelDescription}>
                    {tabs[activeTabIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
