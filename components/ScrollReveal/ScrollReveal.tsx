import React from "react";
import { useIntersection } from "../../hooks/useIntersection";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * ScrollReveal Component
 * 
 * ビューポートに進入したときにフェードイン＋スライドアップするコンポーネント
 * useIntersection フックを使用して、要素が見えるようになったときにアニメーション開始
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
  rootMargin = "0px",
}: ScrollRevealProps) {
  const { ref, isVisible } = useIntersection({ threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={`${styles.scrollReveal} ${isVisible ? styles.visible : ""} ${className}`}
      style={
        delay > 0
          ? {
              "--reveal-delay": `${delay}ms`,
            } as React.CSSProperties
          : undefined
      }
    >
      {children}
    </div>
  );
}
