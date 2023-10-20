import { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const authContext: AuthContextProps = {
    isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
