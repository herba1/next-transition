"use client";
import Carousel from "../components/Carousel";
import MotionPageTransition from "../components/MotionPageTransition";
import { usePageTransition } from "../context/pageTransition";

export default function CarouselPage() {
  usePageTransition();
  return (
    <MotionPageTransition {...usePageTransition()}>
      <main className="h-lvh w-full text-white ">
        <div className="h-full w-full">
          <Carousel></Carousel>
        </div>
      </main>
    </MotionPageTransition>
  );
}
