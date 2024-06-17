import CourseGoal from "@/components/CourseGoalItem";
import InfoBox from "../InfoBox";

import { type ReactNode } from "react";

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
  if (goals.length === 0) {
    <InfoBox mode="hint">You have no course yet. Start adding some!</InfoBox>;
  }

  let warningBox: ReactNode;

  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="high">
        You're collecting a lot of goals. Don't put too mush on your plate!{" "}
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
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
    </>
  );
}
