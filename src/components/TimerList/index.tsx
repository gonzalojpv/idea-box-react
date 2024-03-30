import TimerItem from "@/components/TimerItem";

import { useTimersContext } from "@/contexts/timers-context";

export default function TimerList() {
  const { timers } = useTimersContext();
  return (
    <ul className="list-none max-w-40rem mx-auto mt-8 px-0 font-handjet grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {timers.map(timer => (
        <li
          className="bg-gradient-to-br from-teal-800 to-teal-600 rounded-lg p-4 text-teal-300 shadow-md"
          key={timer.name}
        >
          <TimerItem {...timer} />
        </li>
      ))}
    </ul>
  );
}
