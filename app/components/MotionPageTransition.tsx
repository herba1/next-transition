// an example using the Motion.dev library for page transitions
"use client";
import { motion, Variants } from "motion/react";
import { PageTransitionContextType } from "../context/pageTransition";

export default function MotionPageTransition(
  context: PageTransitionContextType & { children: React.ReactNode },
) {
  const {
    isLeaving,
    isEntering,
    isReady,
    children,
    enterDuration,
    exitDuration,
  } = context;

  const variants: Variants = {
    isLeaving: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: exitDuration / 1000,
      },
    },
    isEntering: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: enterDuration / 1000,
      },
    },
    initial: { opacity: 0, y: 20, filter: "blur(4px)" },
    isReady: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      animate={
        isLeaving
          ? "isLeaving"
          : isEntering
            ? "isEntering"
            : isReady && "isReady"
      }
      initial="initial"
    >
      {children}
    </motion.div>
  );
}
