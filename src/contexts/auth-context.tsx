import { createContext, useState, PropsWithChildren } from "react";

interface AuthContextProps {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  const authContext: AuthContextProps = {
    isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler
  }

  return (
    <AuthContext.Provider value={authContext}>
    {children}
    </AuthContext.Provider>
  )
}

