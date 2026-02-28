"use client";
import MotionPageTransition from "../components/MotionPageTransition";
import { usePageTransition } from "../context/pageTransition";
import Counter from "./Counter";

export default function CounterPage() {
  return (
    <MotionPageTransition {...usePageTransition()}>
      <main className="h-svh w-full">
        <div className="h-full w-full ">
          <Counter></Counter>
        </div>
      </main>
    </MotionPageTransition>
  );
}
