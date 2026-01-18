import Carousel from "../components/Carousel";
import { TransitionSignaler } from "../context/pageTransition";

export default function CarouselPage() {
  return (
    <main className="w-full h-lvh text-white">
      <TransitionSignaler></TransitionSignaler>
      <div className="w-full h-full ">
        <Carousel></Carousel>
      </div>
    </main>
  );
}
