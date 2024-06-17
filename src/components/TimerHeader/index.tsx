import BaseButton from "../BaseButton/index.tsx";
import { useTimersContext } from "@/contexts/timers-context.tsx";

export default function TimerHeader() {
  const timersCtx = useTimersContext();

  return (
    <header className="flex justify-between items-center max-w-40rem mx-auto">
      <h1>ReactTimer</h1>

      <BaseButton onClick={timersCtx.isRunning ? timersCtx.stopTimers : timersCtx.startTimers}>
        {timersCtx.isRunning ? "Stop" : "Start"} Timers
      </BaseButton>
    </header>
  );
}
