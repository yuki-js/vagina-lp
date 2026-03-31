import React from "react";
import { motion } from "framer-motion";

export type MotionFallbackStyle = React.CSSProperties;

export type MotionDivProps = React.ComponentProps<typeof motion.div> & {
  /**
   * Inline styles that are rendered into the SSR HTML.
   *
   * Motivation: Framer Motion v12 doesn't expose a `fallbackStyle` prop, but we
   * still want an explicit place to define the "no-JS" appearance for motion
   * elements (so they never render invisible when JavaScript is disabled).
   */
  fallbackStyle?: MotionFallbackStyle;
};

export function MotionDiv({ fallbackStyle, style, ...props }: MotionDivProps) {
  // `style` may contain MotionValues, so keep it as-is and just ensure the
  // fallback styles are present in the rendered HTML.
  const mergedStyle = {
    ...(fallbackStyle ?? {}),
    ...(style as any),
  } as any;

  return <motion.div {...props} style={mergedStyle} />;
}
