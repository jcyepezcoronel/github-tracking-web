import { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { Button } from "../../shared/components/Button"
import { fetchRepo } from "./repos-services";
import { Spinner } from "../../shared/components/Spinner";
import { TRepo } from "./repos-type";

export const RepoView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repo, setRepo] = useState<TRepo | null>(null);

  const params = useParams()
  const getRepo = useCallback(async () => {
    setIsLoading(true)
    const { data } = await fetchRepo(`${params.owner!}/${params.name!}`) 
    if(data) {
      setRepo(data)
    }
    setIsLoading(false);
  }, [params.owner, params.name])

  useEffect(() => {
    void getRepo()
  }, [getRepo])

  if(isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if(!repo) return <p className="text-xl">NOT FOUND</p>

  return (
    <div>
      <h4 className="text-xl">
        {repo.name}
      </h4>
      <hr className="my-4" />
      <p className="text-gray-400 ">
        {repo.description}
      </p>
      <div className="flex justify-center mt-10">
        <Link to={`/repo/${params.owner!}/${params.name!}/commits`}>
          <Button>
            View Commits
          </Button>
        </Link>
      </div>
    </div>
  )
}