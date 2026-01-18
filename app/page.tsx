"use client";
import Image from "next/image";
import {
  TransitionSignaler,
  usePageTransition,
} from "./context/pageTransition";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Home
      <TransitionSignaler />
    </div>
  );
}
