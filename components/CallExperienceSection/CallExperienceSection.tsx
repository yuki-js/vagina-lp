import React, { useState, useEffect, useRef } from "react";
import styles from "./CallExperienceSection.module.css";

export function CallExperienceSection() {
  const [clipRadius, setClipRadius] = useState("0%");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const animOffset = 1400;
      const sectionHeight = sectionRef.current.clientHeight;
      const scrollY = window.scrollY;
      const progress = (scrollY - sectionTop + animOffset) / sectionHeight;
      const clamped = Math.max(0, Math.min(1, progress));
      // Adjust the multiplier to control how fast the clip expands
      setClipRadius(`${clamped * 800}%`);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call in case the page starts scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        className={`${styles.expandingBg} ${styles.gradient}`}
        style={{ "--clip-radius": clipRadius } as React.CSSProperties}
      ></div>
    </section>
  );
}
