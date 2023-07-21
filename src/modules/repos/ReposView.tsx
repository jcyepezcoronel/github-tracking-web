import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../shared/components/Button"
import { Pagination } from "../../shared/components/Pagination"
import { TRepo } from "./repos-type"
import { fetchReposList } from "./repos-services"
import { Spinner } from "../../shared/components/Spinner"

export const ReposView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [repos, setRepos] = useState<TRepo[]>([]);

  const getReposList = useCallback(async () => {
    setIsLoading(true)
    const { error, data } = await fetchReposList(page, perPage)
    if(error) {
      window.alert(error);
    } 
    if(data) {
      setRepos(data)
    }
    setIsLoading(false);
  }, [page, perPage])

  useEffect(() => {
    void getReposList()
  }, [getReposList])

  if(isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <ul className="space-y-6">
        {repos.map((repo) => (
          <li key={repo.id}>
            <div className="flex justify-between">
              <div>
                <Link
                  to={`/repo/${repo.full_name}`}
                  className="text-xl text-blue-600 hover:text-blue-500 hover:underline cursor-pointer">
                  {repo.name}
                </Link>
                <p className="text-gray-400 text-sm">
                  {repo.description}
                </p>
              </div>
              <div>
                <Link to={`/repo/${repo.full_name}/commits`}>
                  <Button>
                    commits
                  </Button>
                </Link>
              </div>
            </div>
            <hr className="mt-6" />
          </li>
        ))}
      </ul>
      <Pagination 
        onPrev={() => {
          if(page <= 1) return;
          setPage(page - 1)
        }}
        onNext={() => {
          if(perPage > repos.length) return;
          console.log('next')
          setPage(page + 1)
        }}
      />
    </div>
  )
}