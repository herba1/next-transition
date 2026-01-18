import { TransitionSignaler } from "../context/pageTransition";
import Counter from "./Counter";

export default function CounterPage() {
  return (
    <main className="h-svh w-full">
      <div className=" w-full h-full bg-slate-100">
        <Counter></Counter>
      </div>
      <TransitionSignaler />
    </main>
  );
}
