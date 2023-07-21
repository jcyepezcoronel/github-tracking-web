import { createContext, useCallback, useEffect, useState } from "react";
import { TSession, TUser } from "./auth-types";
import { existToken } from "./auth-utils";
import { fetchUser } from "./auth-services";

const initialState: TSession = {
  isLoading: false,
  isAuthenticated: false,
  isConnected: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkSession: async () => {}
}

export const SessionContext = createContext(initialState)

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<TUser>();

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    if(existToken()) {
      const { data, error } = await fetchUser();
      if(!error) {
        setIsAuthenticated(true);
        setIsConnected(Boolean(data?.githubToken));
        setUser(data);
      }
    } else {
      setIsAuthenticated(false);
      setIsConnected(false);
      setUser(undefined);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    checkSession().finally(() => {
      console.log('validation completed')
    });
  }, [checkSession])

  return (
    <SessionContext.Provider value={{
      isLoading,
      isAuthenticated,
      isConnected,
      checkSession,
      user
    }}>
      {children}      
    </SessionContext.Provider>
  )
}
