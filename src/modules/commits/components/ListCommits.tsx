import { useMemo } from "react"
import { TCommitRoot } from "../commits-types"
import { CommitCard } from "./CommitCard"
import moment from "moment"

export const ListCommits = ({
  items
}: { items: TCommitRoot[] }) => {

  const itemsGroupByDate = useMemo(() => {
    const datesMap: { [k: string]: TCommitRoot[] } = {}
    items.forEach((item) => {
      const formatedDate = moment(item.commit.committer.date).format('MMM DD, YYYY')
      if(!datesMap[formatedDate]) datesMap[formatedDate] = [];
      datesMap[formatedDate].push(item);
    })
    return Object.entries(datesMap)
  }, [items])

  return (
    <ul className="space-y-7">
    {itemsGroupByDate.map(([date, commits]) => (
      <li key={`date-${date}`}>
        <p className="text-gray-400 mb-5">{date}</p>
        <ul className="space-y-3 pl-7">
        {commits.map((commit) => (
          <CommitCard 
            key={commit.sha.slice(commit.sha.length - 4)}
            data={commit}
          />
        ))}
        </ul>
      </li>
    ))}
  </ul>
  )
}