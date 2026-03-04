import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import styles from "./PricingSection.module.css";

const PLANS = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for exploring VAGINA",
    price: "$0",
    features: [
      "Up to 10 voice conversations/day",
      "Basic AI note-taking",
      "1 character preset",
      "Community support",
    ],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Designed for serious creators",
    price: "$19",
    period: "/month",
    features: [
      "Unlimited voice conversations",
      "Advanced AI note-taking",
      "Text agent access",
      "Priority support",
      "Custom character creation",
      "Export to multiple formats",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams and organizations",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    isPopular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export function PricingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <ScrollReveal className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.heading}
          >
            Simple, Transparent Pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.subheading}
          >
            Choose the plan that fits your voice. Coming soon.
          </motion.p>
        </ScrollReveal>

        {/* Pricing Cards */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              className={`${styles.card} ${plan.isPopular ? styles.popular : ""}`}
              variants={cardVariants}
              whileHover={{ y: -12 }}
            >
              {/* Coming Soon Badge */}
              <div className={styles.badge}>Coming Soon</div>

              {/* Popular Badge */}
              {plan.isPopular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              {/* Plan Name & Description */}
              <div className={styles.header_}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              {/* Price */}
              <div className={styles.priceBlock}>
                <div className={styles.price}>{plan.price}</div>
                {plan.period && (
                  <div className={styles.period}>{plan.period}</div>
                )}
              </div>

              {/* CTA Button */}
              <motion.button
                className={`${styles.button} ${plan.isPopular ? styles.buttonPrimary : styles.buttonSecondary}`}
                disabled
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Coming Soon
              </motion.button>

              {/* Features List */}
              <ul className={styles.features}>
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className={styles.feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className={styles.footerText}>
            Currently available as an open-source project on{" "}
            <a
              href="https://github.com/yuki-js/vagina"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            . Use your own API keys to get started today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
