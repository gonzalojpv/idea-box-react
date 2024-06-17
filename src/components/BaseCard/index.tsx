// Example: A Card component that has multiple "slots" for content
// Main slot => children prop
// Actions slot => actions prop

import { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
  // "actions" is like an extra "slot" of this component
  // It's the same type as the children prop, since we expect JSX code as a prop value
  actions: ReactNode;
};

const BaseCard = ({ title, children, actions }: CardProps) => {
  return (
    <section className="bg-white px-4 py-5 sm:px-6 text-gray-900">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      {children}
      {actions}
    </section>
  );
};

export default BaseCard;
