import { Button } from "../../shared/components/Button"
import { Card } from "../../shared/components/Card"
import { GITHUB_OAUTH_CLIENT_ID } from "../../shared/constants/environment";

const GITHUB_OAUTH_URI = `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}`;

export const ConnectGithub = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Card>
        <p className="mb-10">Your must connect with github for continue</p>
        <Button 
          onClick={() => window.location.replace(GITHUB_OAUTH_URI)}
          className="mx-auto block">
          Connect with Github
        </Button>
      </Card>
    </div>
  )
}