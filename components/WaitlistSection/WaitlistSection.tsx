import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal/ScrollReveal";
import styles from "./WaitlistSection.module.css";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.heading}>
              Join the future of thinking
            </h2>

            <p className={styles.subheading}>
              Be among the first to experience voice-powered AGI note-taking.
              Early access starts soon.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={`${styles.input} ${error ? styles.inputError : ""}`}
                />

                <motion.button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={styles.button}
                  whileHover={{ scale: isLoading || isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || isSubmitted ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      className={styles.spinner}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : isSubmitted ? (
                    <span>✓ Joined</span>
                  ) : (
                    <span>Get Access</span>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.p
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    Thank you! Check your email for updates.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            <p className={styles.note}>
              We'll only email you about VAGINA updates. No spam, ever.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
