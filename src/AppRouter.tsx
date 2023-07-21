import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { LoginView } from "./modules/auth/LoginView";
import { DashboardLayout } from "./shared/layout/DashboardLayout";
import { Session } from "./modules/auth/Session";
import { ReposView } from "./modules/repos/ReposView";
// import { CommitsView } from "./modules/commits/CommitsView";
import { SignUpvView } from "./modules/auth/SignUpvView";
import { RepoView } from "./modules/repos/RepoView";
import { RepoCommitsView } from "./modules/repos/RepoCommitsView";
import { GithubCallbackView } from "./modules/auth/GithubCallbackView";
import { LogoutView } from "./modules/auth/LogoutView";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpvView />} />
        <Route path="/logout" element={<LogoutView />} />
        <Route path="/github-callback" element={<GithubCallbackView />} />
        <Route path="/" element={(
          <Session>
            <DashboardLayout>
              <Outlet />  
            </DashboardLayout>
          </Session>
        )}>
          <Route index element={<>Welcome to Github Tracking</>} />
          <Route path="/repos" element={<ReposView />} />
          <Route path="/repo/:owner/:name" element={<Outlet />}>
            <Route index element={<RepoView />} />
            <Route path="commits" element={<RepoCommitsView />} />
          </Route>
          {/* <Route path="commits" element={<CommitsView />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}