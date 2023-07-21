import { useState, useCallback, useEffect } from "react";
import { Pagination } from "../../shared/components/Pagination"
import { Spinner } from "../../shared/components/Spinner";
import { fetchCommitsList } from "./commits-services";
import { TCommitRoot } from "./commits-types";
import { ListCommits } from "./components/ListCommits"

export const CommitsView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [commits, setCommits] = useState<TCommitRoot[]>([]);
  const [error, setError] = useState('');

  const getCommitsList = useCallback(async () => {
    setIsLoading(true)
    const { error, data } = await fetchCommitsList(
      page, 
      perPage
    )
    if(error) setError(error)
    if(data) setCommits(data)
    setIsLoading(false);
  }, [page, perPage])

  useEffect(() => {
    void getCommitsList()
  }, [getCommitsList])

  if(isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if(error) {
    return (
      <p className="text-xl text-center">
        {error}
      </p>
    )
  }

  return (
    <div>
      <ListCommits 
        items={commits}
      />
      <Pagination 
        onPrev={() => {
          if(page <= 1) return;
          setPage(page - 1)
        }}
        onNext={() => {
          if(perPage > commits.length) return;
          setPage(page + 1)
        }}
      />
    </div>
  )
}