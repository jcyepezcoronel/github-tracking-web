import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingFullScreen } from "../../shared/components/LoadingPage";
import { useSession } from "./auth-hooks";
import { createAccessToGithubByCode } from "./auth-services";

export const GithubCallbackView = () => {
  const { isAuthenticated, checkSession } = useSession()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const createAccess =  useCallback(async () => {
    const code = searchParams.get('code');
    if(!code) {
      navigate('/')
      return;
    } 
    if(!isAuthenticated) return;
    const { error } = await createAccessToGithubByCode(code)
    if(error) {
      window.alert(error);
    } 
    await checkSession()
    navigate('/')
  }, [searchParams, isAuthenticated, checkSession, navigate])

  useEffect(() => {
    void createAccess()
  }, [createAccess])

  return (
    <LoadingFullScreen />
  )
}
