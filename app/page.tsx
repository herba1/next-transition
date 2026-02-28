"use client";
import Image from "next/image";
import {
  TransitionSignaler,
  usePageTransition,
} from "./context/pageTransition";
import MotionPageTransition from "./components/MotionPageTransition";

export default function Home() {
  const context = usePageTransition();
  return (
    <MotionPageTransition {...context}>
      <div className="flex bg-inherit min-h-screen items-center justify-center">Home</div>
    </MotionPageTransition>
  );
}
