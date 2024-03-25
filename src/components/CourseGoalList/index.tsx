import CourseGoal from "@/components/CourseGoalItem";

export type CGoal = {
  title: string;
  description: string;
  id: number;
};

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({ goals, onDeleteGoal }: CourseGoalListProps) {
  return (
    <ul className="list-none m-0 p-0 grid gap-4 sm:grid-cols-auto-fit sm:grid-cols-minmax-15rem">
      {goals.map(goal => (
        <li
          className="bg-gray-700 text-left p-4 rounded shadow-md grid grid-cols-auto-fit grid-cols-minmax-15rem-1fr auto-fill-test"
          key={goal.id}
        >
          <CourseGoal id={goal.id} title={goal.title} onDelete={onDeleteGoal}>
            <p className="m-0 text-xs text-gray-300">{goal.description}</p>
          </CourseGoal>
        </li>
      ))}
    </ul>
  );
}
