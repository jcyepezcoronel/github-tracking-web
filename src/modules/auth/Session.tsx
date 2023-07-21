import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "./auth-hooks"
import { LoadingFullScreen } from "../../shared/components/LoadingPage";
import { ConnectGithub } from "./ConnectGithub";

export const Session = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isConnected } = useSession();

  useEffect(() => {
    if(!isAuthenticated && !isLoading) {
      navigate({
        pathname: 'login'
      })
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isAuthenticated) {
    if(!isConnected) return <ConnectGithub />
    return <>{children}</>
  }

  return <LoadingFullScreen />;
}