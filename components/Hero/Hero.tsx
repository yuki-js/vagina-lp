import { motion } from "framer-motion";
import { useBrand } from "../../hooks/useBrand";
import { WindowMock } from "../WindowMock/WindowMock";
import styles from "./Hero.module.css";

const BARS = Array.from({ length: 64 }, (_, i) => {
  const h = [
    6, 12, 4, 16, 8, 20, 5, 14, 10, 18, 4, 12, 16, 8, 22, 6, 10, 18, 5, 14, 8,
    20, 12, 6, 15, 9, 19, 7,
  ];
  return h[i % h.length];
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

export function Hero() {
  const brand = useBrand();
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.text}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.span className={styles.badge} variants={rise}>
          <span className={styles.badgeDot} />
          April Fools
        </motion.span>

        <motion.h1 className={styles.heading} variants={rise}>
          <strong>V</strong>oice <strong>AGI</strong> <wbr />
          <strong>N</strong>otepad <strong>A</strong>gent
        </motion.h1>

        <motion.p className={styles.sub} variants={rise}>
          {brand.name} is a voice-powered AGI assistant with agentic
          note-taking. It helps you capture ideas, organize your thoughts, and
          get things done — all through natural conversation.
        </motion.p>

        <motion.div className={styles.actions} variants={rise}>
          <a href="#waitlist" className={styles.primary}>
            Get Early Access
          </a>
          <a
            href={brand.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.preview}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.25, 1, 0.5, 1] as const,
        }}
      >
        <WindowMock title={brand.name}>
          <div className={styles.paneContainer}>
            {/* Left Pane - Chat Thread */}
            <div className={styles.pane}>
              <div className={styles.chatThread}>
                <div className={styles.chatBubble}>
                  <div className={styles.chatUser}>You</div>
                  <div className={styles.chatContent}>
                    Create meeting notes for Q4 planning
                  </div>
                </div>

                <div className={`${styles.chatBubble} ${styles.chatAssistant}`}>
                  <div className={styles.chatUser}>Assistant</div>
                  <div className={styles.chatContent}>
                    I've created the meeting notes. What would you like to add?
                  </div>
                </div>

                <div className={styles.chatBubble}>
                  <div className={styles.chatUser}>You</div>
                  <div className={styles.chatContent}>
                    Add that the budget was approved
                  </div>
                </div>
              </div>

              <div className={styles.voiceBar}>
                <svg
                  className={styles.mic}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1.5a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0v-4a2 2 0 0 0-2-2Z"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7a4 4 0 0 1-8 0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="8"
                    y1="11"
                    x2="8"
                    y2="14"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={styles.bars}>
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className={styles.bar}
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pane */}
            <div className={styles.pane}>
              <div className={styles.editorLines}>
                <code>
                  <span className={styles.accent}>##</span> Meeting Notes — Q4
                  Planning
                </code>
                <code className={styles.dim}>---</code>
                <code>Budget approved for new infra.</code>
                <code>
                  Move launch to <span className={styles.accent}>March 12</span>
                  .
                </code>
                <code>
                  Assign design review to Aya.
                  <span className={styles.cursor} />
                </code>
              </div>
            </div>
          </div>
        </WindowMock>
      </motion.div>
    </section>
  );
}
