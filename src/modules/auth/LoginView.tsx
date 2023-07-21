import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../shared/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { login } from "./auth-services";
import { useSession } from "./auth-hooks";
import { LoadingFullScreen } from "../../shared/components/LoadingPage";

type TLoginForm = {
  email: string;
  password: string;
}
const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})
export const LoginView = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });
  const { isAuthenticated, isLoading: isLoadingSession, checkSession } = useSession()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async ({
    email,
    password
  }: TLoginForm) => {
    setIsLoading(true)
    const { error }  = await login(email, password)
    if(error) {
      setError('root', { message: error });
      setIsLoading(false)
    } else {
      await checkSession()
    }
  }, [checkSession, setError])

  useEffect(() => {
    if(isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  if(isLoadingSession) return <LoadingFullScreen />

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Card className="w-full" style={{ maxWidth: 350 }}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Input 
                      type="text" 
                      id="email" 
                      placeholder="test@mail.com" 
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      disabled={isLoading}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (                 
                    <Input 
                      type="password" 
                      id="password" 
                      placeholder="1234567890" 
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      value={value}
                      onChange={onChange}
                      />
                  )
                }}
              />
            </div>
            <div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}>
                Login
              </Button>
              {errors.root 
                ?  <span className="text-red-800 text-xs">{errors.root.message}</span>
                : null}
            </div>
            <div>
              <Link to="/signup" className="text-blue-700 text-center block underline">
                Register
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}