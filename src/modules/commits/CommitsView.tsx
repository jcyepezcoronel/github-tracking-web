import { Pagination } from "../../shared/components/Pagination"
import { ListCommits } from "./components/ListCommits"

export const CommitsView = () => {
  return (
    <div>
      <ListCommits 
        items={[]}
      />
      <Pagination 
        onPrev={() => {
          console.log('prev')
        }}
        onNext={() => {
          console.log('next')
        }}
      />
    </div>
  )
}