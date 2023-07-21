import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../shared/components/Button"
import { Card } from "../../shared/components/Card"
import { Input } from "../../shared/components/Input"
import { signUp } from './auth-services';
import { useSession } from './auth-hooks';
import { LoadingFullScreen } from '../../shared/components/LoadingPage';

type TSignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
}
const signUpSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
})

export const SignUpvView = () => {
  const { isAuthenticated, isLoading: isLoadingSession } = useSession()
  const { handleSubmit, control, setError, formState: { errors } } = useForm<TSignUpForm>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { email: '', password: '', repeatPassword: '' }
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async ({
    email, password
  }: TSignUpForm) => {
    setIsLoading(true);
    const { error }  = await signUp(email, password)
    if(error) {
      setError('root', { message: error });
    } else {
      navigate('/login')
    }
    setIsLoading(false);
  }, [navigate, setError])

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }
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
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  )
                }}
              />
            </div>
            <div>
              <label 
                htmlFor="repeat-password" 
                className="block mb-2 text-sm font-medium text-white">
                Repeat password
              </label>
              <Controller
                name="repeatPassword"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (                 
                    <Input 
                      type="password" 
                      id="repeat-password" 
                      placeholder="1234567890" 
                      error={Boolean(errors.repeatPassword)}
                      helperText={errors.repeatPassword?.message}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            </div>
            <div>
              <Button
                disabled={isLoading}
                className="w-full">
                Sign Up
              </Button>
              {errors.root 
                ?  <span className="text-red-800 text-xs">{errors.root.message}</span>
                : null}
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
