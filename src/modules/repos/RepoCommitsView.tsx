import { useState, useCallback, useEffect } from "react";
import { Pagination } from "../../shared/components/Pagination"
import { Spinner } from "../../shared/components/Spinner";
import { ListCommits } from "../commits/components/ListCommits"
import { fetchRepoCommitsList } from "./repos-services";
import { TCommitRoot } from "../commits/commits-types";
import { useParams } from "react-router-dom";

export const RepoCommitsView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [commits, setCommits] = useState<TCommitRoot[]>([]);
  const [error, setError] = useState('');

  const params = useParams()

  const getCommitsList = useCallback(async () => {
    setIsLoading(true)
    const { error, data } = await fetchRepoCommitsList(
      `${params.owner!}/${params.name!}`,
      page, 
      perPage
    )
    if(error) setError(error)
    if(data) {
      setCommits(data)
    }
    setIsLoading(false);
  }, [page, params.name, params.owner, perPage])

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
      <h4 className="text-xl">
        {params.name}
      </h4>
      <hr className="my-4" />
      <ListCommits items={commits} />
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