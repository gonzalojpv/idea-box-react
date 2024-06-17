import { type ReactNode } from "react";

type HeaderProps = {
  image: {
    src: string;
    alt: string;
  };
  children: ReactNode;
};

const CourseGoalHeader = ({ image, children }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-6 justify-center items-center">
      <img {...image} className="w-20 h-20 rounded-full" />
      {children}
    </header>
  );
};

export default CourseGoalHeader;
