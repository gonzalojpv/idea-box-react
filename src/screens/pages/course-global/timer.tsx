import TimersContextProvider from "@/contexts/timers-context";
import TimerHeader from "@/components/TimerHeader";
import TimerAdd from "@/components/TimerAdd";
import TimerList from "@/components/TimerList";

const TimerPage = () => {
  return (
    <TimersContextProvider>
      <TimerHeader />
      <main>
        <TimerAdd />
        <TimerList />
      </main>
    </TimersContextProvider>
  );
};

export default TimerPage;
