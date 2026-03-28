import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import styles from "./AprilSlopSection.module.css";

const ACRONYM: { letter: string; word: string }[] = [
  { letter: "V", word: "oice" },
  { letter: "A", word: "rtificial" },
  { letter: "G", word: "eneral" },
  { letter: "I", word: "ntelligence" },
  { letter: "N", word: "otepad" },
  { letter: "A", word: "gent" },
];

export function AprilSlopSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <h2 className={styles.heading}>
            Certified <strong>April Slop</strong>.
          </h2>

          <p className={styles.subheading}>
            Born on April 1st. Every letter in the name earned its place. The
            word they spell did not — and that is entirely the point.
          </p>
        </ScrollReveal>

        <div className={styles.squareRow}>
          {ACRONYM.map(({ letter, word }, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className={styles.letterSquare}>
                <div className={styles.contentWrapper}>
                  <span className={styles.squareText}>{letter}</span>
                  <span className={styles.revealText}>{word}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
