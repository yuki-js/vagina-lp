import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { PhoneMock } from "../PhoneMock/PhoneMock";
import { HomeScreenMock, TabType } from "../HomeScreenMock/HomeScreenMock";
import styles from "./HomeExperienceSection.module.css";

const tabs: { id: TabType; title: string; description: string }[] = [
  {
    id: "speed-dial",
    title: "Quick Access",
    description: "Save your favorite AGI characters for instant calling",
  },
  {
    id: "sessions",
    title: "Call History",
    description: "Review past conversations and insights",
  },
  {
    id: "agents",
    title: "Text Agents",
    description: "Manage your AGI assistants for complex tasks",
  },
  {
    id: "more",
    title: "More Features",
    description: "Explore files, tools, and additional capabilities",
  },
];

export function HomeExperienceSection() {
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

      // Calculate scroll progress within the section
      const scrollStart = sectionTop - viewportHeight / 2;
      const scrollEnd = sectionTop + sectionHeight - viewportHeight / 2;
      const scrollProgress =
        (scrollY - scrollStart) / (scrollEnd - scrollStart);

      // Map scroll progress to tab index
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const newTabIndex = Math.floor(clampedProgress * tabs.length);
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.heading}
          >
            Talk to <strong>AGI</strong> like it's <br />a phone call.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.subheading}
          >
            Feels as natural as making a call.
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
              <HomeScreenMock activeTab={tabs[activeTabIndex].id} />
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
