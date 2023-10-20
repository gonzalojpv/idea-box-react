import { ReactNode, createContext, useState } from "react";
import type { FirebaseUser } from "../types/user";

export interface AccountContextProps {
  currentUser: FirebaseUser;
  setAccount: (user: FirebaseUser) => void;
}

type Props = {
  children: ReactNode;
};

export const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountContextProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<FirebaseUser>(null);

  const accountContext: AccountContextProps = {
    currentUser: account,
    setAccount,
  };

  return <AccountContext.Provider value={accountContext}>{children}</AccountContext.Provider>;
};
