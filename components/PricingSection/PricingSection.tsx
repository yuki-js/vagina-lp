import React from "react";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { FiCheck } from "react-icons/fi";
import { useBrand } from "../../hooks/useBrand";
import styles from "./PricingSection.module.css";

const FEATURES = [
  "Voice sessions",
  "Notepad",
  "Recursive Text Agent",
  "Capricious Rate Limiting",
  "Data Collection for product improvements",
];

export function PricingSection() {
  const brand = useBrand();

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
              VAGINA
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
              VAGINA
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
              VAGINA
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pricing-bg)" />
      </svg>
      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <h2 className={styles.heading}>
            Start talking to <strong>AGI</strong> today.
          </h2>

          <p className={styles.subheading}>
            Simple, transparent pricing. Free during the initial beta period.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.reveal}`}>
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

            <a href={brand.links.app} className={styles.button}>
              Get Started for Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
