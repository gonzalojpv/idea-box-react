import { ReactNode } from "react";
import { AccountContextProvider } from "../../contexts/account-context";

interface ChildProps {
  children: ReactNode;
}

const defaultLayout = ({ children }: ChildProps) => {
  return (
    <AccountContextProvider>
      <div className="container p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
    </AccountContextProvider>
  );
};

export default defaultLayout;
