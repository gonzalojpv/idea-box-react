import CourseGoalForm from "@/components/CourseGoalForm";
import CourseGoalList from "@/components/CourseGoalList";

import { useState } from "react";

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

const CourseGlobalPage = () => {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleAddGoal(goal: string, summary: string) {
    setGoals(prevGoals => {
      const newGoal: CourseGoal = {
        id: Math.random(),
        title: goal,
        description: summary,
      };
      return [...prevGoals, newGoal];
    });
  }

  function handleDeleteGoal(id: number) {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  }

  return (
    <>
      <CourseGoalForm onAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </>
  );
};

export default CourseGlobalPage;
