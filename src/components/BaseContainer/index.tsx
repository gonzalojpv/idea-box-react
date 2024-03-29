import { type ReactNode, type ElementType, ComponentPropsWithoutRef } from "react";

type BaseContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const BaseContainer = <C extends ElementType>({
  as,
  children,
  ...props
}: BaseContainerProps<C>) => {
  const Component = as || "div";

  return (
    <Component className="container" {...props}>
      {children}
    </Component>
  );
};

export default BaseContainer;
