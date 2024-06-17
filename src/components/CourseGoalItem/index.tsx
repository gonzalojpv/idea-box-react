import { type PropsWithChildren } from "react";

// interface CourseGoalProps {
//   title: string;
//   children: ReactNode
// }

type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  onDelete: (id: number) => void;
}>;

export default function CourseGoal({ title, id, children, onDelete }: CourseGoalProps) {
  return (
    <article className="flex justify-between items-start">
      <div>
        <h2 className="m-0 text-base text-gray-400">{title}</h2>
        {children}
      </div>
      <button
        className="font-inherit px-2 bg-transparent border-none text-gray-500 cursor-pointer hover:text-yellow-400"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </article>
  );
}

// const CourseGoal: FC<CourseGoalProps> = ({ title, children }) => {
//   return (
//     <article>
//       <div>
//         <h2>{title}</h2>
//         {children}
//       </div>
//       <button>Delete</button>
//     </article>
//   );
// };

// export default CourseGoal;
