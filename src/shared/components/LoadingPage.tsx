import { Spinner } from "./Spinner"

export const LoadingFullScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Spinner />
    </div>
  )
}