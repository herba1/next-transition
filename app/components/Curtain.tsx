"use client";
import { usePageTransition } from "../context/pageTransition";

export default function Curtain() {
  const { isLeaving, isEntering, isPending, isReady, enterDuration } =
    usePageTransition();
  return (
    <div
      className={`fixed inset-0 bg-black pointer-events-none z-50 flex items-center justify-center opacity-0 transition-opacity will-change-opacity duration-[${enterDuration}ms] ${
        isLeaving || isEntering || isPending ? "opacity-100" : ""
      } `}
    >
      <div
        className={`font-extralight h-5 w-5 aspect-square bg-blue-700 opacity-0 duration-200 ${
          isPending && "opacity-100 delay-100"
        } animate-spin transition-opacity font-serif text-6xl`}
      ></div>
    </div>
  );
}
