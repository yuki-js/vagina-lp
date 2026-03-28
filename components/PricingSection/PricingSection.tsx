import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { FiCheck } from "react-icons/fi";
import styles from "./PricingSection.module.css";
import { BRAND } from "../../config/brand";

const FEATURES = [
  "Voice sessions",
  "Notepad",
  "Recursive Text Agent",
  "Capricious Rate Limiting",
  "Data Collection for product improvements",
];

export function PricingSection() {
  return (
    <section id="pricing" className={styles.section}>
      <svg className={styles.backgroundPattern} aria-hidden="true">
        <defs>
          <pattern
            id="pricing-bg"
            width="378"
            height="196"
            patternUnits="userSpaceOnUse"
          >
            <text
              x="0"
              y="0"
              dominantBaseline="hanging"
              fill="currentColor"
              fontSize="98"
              fontWeight="700"
              textLength="358"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {BRAND.name}
            </text>
            <text
              x="-196"
              y="98"
              dominantBaseline="hanging"
              fill="currentColor"
              fontSize="98"
              fontWeight="700"
              textLength="358"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {BRAND.name}
            </text>
            <text
              x="182"
              y="98"
              dominantBaseline="hanging"
              fill="currentColor"
              fontSize="98"
              fontWeight="700"
              textLength="358"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {BRAND.name}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pricing-bg)" />
      </svg>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.heading}
          >
            Start talking to <strong>AGI</strong> today.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.subheading}
          >
            Simple, transparent pricing. Free during the initial beta period.
          </motion.p>
        </ScrollReveal>

        <div className={styles.grid}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.tierName}>Pro</div>
            <div className={styles.price}>
              <span className={styles.oldPrice}>$19</span>
              <div className={styles.newPrice}>Free</div>
              <span className={styles.betaNote}>while in beta</span>
            </div>
            <p className={styles.tierDescription}>
              Everything you need to experience the future of Voice AGI.
            </p>

            <ul className={styles.features}>
              {FEATURES.map((feature, i) => (
                <li key={i} className={styles.feature}>
                  <FiCheck className={styles.featureIcon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={styles.button}>Get Started for Free</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
