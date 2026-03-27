import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import styles from "./AprilSlopSection.module.css";

const ACRONYM: { letter: string; word: string }[] = [
  { letter: "V", word: "Voice" },
  { letter: "A", word: "Artificial" },
  { letter: "G", word: "General" },
  { letter: "I", word: "Intelligence" },
  { letter: "N", word: "Notepad" },
  { letter: "A", word: "Agent" },
];

export function AprilSlopSection() {
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
            Certified <strong>April Slop</strong>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.subheading}
          >
            Born on April 1st. Every letter in the name earned its place. The
            word they spell did not — and that is entirely the point.
          </motion.p>
        </ScrollReveal>

        <div className={styles.acronym}>
          {ACRONYM.map(({ letter, word }, i) => (
            <motion.div
              key={i}
              className={styles.acronymRow}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: true }}
            >
              <span className={styles.acronymLetter}>{letter}</span>
              <span className={styles.acronymDivider} aria-hidden="true" />
              <span className={styles.acronymWord}>{word}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
