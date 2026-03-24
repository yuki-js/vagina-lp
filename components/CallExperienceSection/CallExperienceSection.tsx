import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import { PhoneMock } from "../PhoneMock/PhoneMock";
import styles from "./CallExperienceSection.module.css";

export function CallExperienceSection() {
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

        <motion.div
          className={styles.preview}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <PhoneMock size="xlarge">
            <div className={styles.placeholder}>
              {/* Phone content will go here */}
            </div>
          </PhoneMock>

          <div className={styles.panel}>
            {/* Panel content will go here */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
