import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { LoadingFullScreen } from "../../shared/components/LoadingPage"
import { useSession } from "./auth-hooks";

export const LogoutView = () => {
  const navigate = useNavigate();
  const { checkSession, isAuthenticated } = useSession();
  
  console.log('isAuthenticated', isAuthenticated); 

  useEffect(() => {
    const call = async () => {
      sessionStorage.removeItem('auth_token')
      await checkSession()
      navigate('/login')
    }
    void call()
  }, [checkSession, navigate]) 

  return (
    <LoadingFullScreen />
  )
}
