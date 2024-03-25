import { useRef, type FormEvent } from "react";

type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function CourseGoalForm({ onAddGoal }: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal = goal.current!.value;
    const enteredSummary = summary.current!.value;

    event.currentTarget.reset();
    onAddGoal(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="block my-4">
        <label className="block text-xs font-bold uppercase text-gray-400" htmlFor="goal">
          Your goal
        </label>
        <input
          className="w-full px-2 py-1 bg-gray-300 border border-gray-400 rounded text-gray-900"
          style={{ font: "inherit" }}
          id="goal"
          type="text"
          ref={goal}
        />
      </p>
      <p className="block my-4">
        <label className="block text-xs font-bold uppercase text-gray-400" htmlFor="summary">
          Short summary
        </label>
        <input
          className="w-full px-2 py-1 bg-gray-300 border border-gray-400 rounded text-gray-900"
          style={{ font: "inherit" }}
          id="summary"
          type="text"
          ref={summary}
        />
      </p>
      <p className="block my-4">
        <button
          className="block w-full px-3 py-2 mt-4 bg-yellow-300 border border-none rounded font-bold text-gray-900 cursor-pointer hover:bg-yellow-400"
          style={{ font: "inherit" }}
        >
          Add Goal
        </button>
      </p>
    </form>
  );
}
