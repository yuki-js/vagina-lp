import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import styles from "./FeaturesSection.module.css";

const FEATURES = [
  {
    id: "voice",
    icon: "🎤",
    title: "Voice Conversations",
    description:
      "Experience natural, real-time dialogue with GPT-4o. Your voice becomes the interface—intuitive, seamless, and profoundly human.",
  },
  {
    id: "notepad",
    icon: "📝",
    title: "AGI Notepad",
    description:
      "Your ideas transform instantly into living documents. As you speak, the AGI listens and writes, capturing your thoughts with precision.",
  },
  {
    id: "agents",
    icon: "🧠",
    title: "Text Agents",
    description:
      "Unlock deeper analysis and long-form generation. Our text agents work behind the scenes to turn your voice into comprehensive insights.",
  },
  {
    id: "anywhere",
    icon: "🌍",
    title: "Anywhere. Anytime.",
    description:
      "Android, iOS, Windows, Web. One seamless experience across every device. Your voice agent goes where you go.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.heading}
          >
            Designed for <br />
            the way you think
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.subheading}
          >
            Every feature is built with one principle: honor your voice, amplify
            your ideas.
          </motion.p>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              className={styles.card}
              variants={cardVariants}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(0)";
              }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>

              <h3 className={styles.title}>{feature.title}</h3>

              <p className={styles.description}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
