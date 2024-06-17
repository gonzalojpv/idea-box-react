import { useEffect, useRef, useState } from "react";
import BaseContainer from "../BaseContainer/index.tsx";

import { useTimersContext, type Timer as TimerProps } from "@/contexts/timers-context.tsx";

export default function TimerItem({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingState, setRemainingState] = useState(duration * 1000);

  const { isRunning } = useTimersContext();

  if (remainingState <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setRemainingState(prevTime => prevTime - 50);
      }, 50);

      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

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
