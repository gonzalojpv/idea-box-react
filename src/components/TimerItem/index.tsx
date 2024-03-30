import { useEffect, useRef, useState } from "react";
import BaseContainer from "../BaseContainer/index.tsx";

import { type Timer as TimerProps } from "@/contexts/timers-context.tsx";

export default function TimerItem({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingState, setRemainingState] = useState(duration * 1000);

  if (remainingState <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingState(prevTime => prevTime - 50);
    }, 50);

    interval.current = timer;

    return () => clearInterval(timer);
  }, []);

  const formattedRemainingState = (remainingState / 1000).toFixed(2);

  return (
    <BaseContainer as="article">
      <h2 className="text-2xl text-center mb-0">{name}</h2>
      <p>
        <progress
          className="w-full h-4 rounded-md my-4 appearance-none"
          max={duration * 1000}
          value={remainingState}
        />
      </p>
      <p className="text-center text-lg text-teal-400">{formattedRemainingState}</p>
    </BaseContainer>
  );
}
