import SessionProvider from './modules/auth/SessionProvider'
import { AppRouter } from './AppRouter'

export const Application = () => {
  return (
    <SessionProvider>
      <AppRouter />
    </SessionProvider>
  )
}

