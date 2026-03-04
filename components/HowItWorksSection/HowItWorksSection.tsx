import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HowItWorksSection.module.css";

const STEPS = [
  {
    id: 1,
    number: "01",
    title: "Set Up Your Voice",
    description:
      "Enter your API credentials and choose your preferred character. In seconds, you're ready to have intelligent conversations.",
    icon: "⚙️",
  },
  {
    id: 2,
    number: "02",
    title: "Start Conversing",
    description:
      "Press the microphone button and speak naturally. Your voice is instantly transcribed and understood by GPT-4o.",
    icon: "🎤",
  },
  {
    id: 3,
    number: "03",
    title: "Watch It Unfold",
    description:
      "As you speak, notes appear in real-time. Text agents analyze and expand on your ideas, turning thoughts into actionable content.",
    icon: "✨",
  },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.heading}>How It Works</h2>
          <p className={styles.subheading}>
            Three simple steps to unlock your voice-powered intelligence
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className={styles.stepsContainer}>
          {STEPS.map((step, index) => {
            const stepProgress = useTransform(
              scrollYProgress,
              [0, 1],
              [0, 1]
            );

            const opacity = useTransform(
              stepProgress,
              [Math.max(0, index * 0.3 - 0.2), Math.min(1, (index + 1) * 0.3 + 0.1)],
              [0.3, 1]
            );

            const scale = useTransform(
              stepProgress,
              [Math.max(0, index * 0.3 - 0.2), Math.min(1, (index + 1) * 0.3 + 0.1)],
              [0.9, 1]
            );

            const y = useTransform(
              stepProgress,
              [Math.max(0, index * 0.3 - 0.2), Math.min(1, (index + 1) * 0.3 + 0.1)],
              [60, 0]
            );

            return (
              <motion.div
                key={step.id}
                className={styles.step}
                style={{
                  opacity,
                  scale,
                  y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                {/* Number Column */}
                <div className={styles.numberColumn}>
                  <motion.div
                    className={styles.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Connector Line */}
                  {index < STEPS.length - 1 && (
                    <motion.div
                      className={styles.connector}
                      style={{
                        scaleY: useTransform(
                          scrollYProgress,
                          [
                            Math.max(0, index * 0.3 - 0.1),
                            Math.min(1, (index + 1) * 0.3 + 0.2),
                          ],
                          [0, 1]
                        ),
                      }}
                    />
                  )}
                </div>

                {/* Content Column */}
                <div className={styles.content}>
                  <motion.div
                    className={styles.iconWrapper}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + 0.1,
                      ease: "backOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.icon}>{step.icon}</span>
                  </motion.div>

                  <motion.h3
                    className={styles.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.15,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.2,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
