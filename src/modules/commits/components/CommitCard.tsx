import moment from "moment"
import { TCommitRoot } from "../commits-types"

export const CommitCard = ({ data }: { data: TCommitRoot }) => {
  const formatedDate = moment(data.commit.committer.date).format('MMM DD, YYYY')
  return (
    <div className="border rounded hover:bg-gray-800 px-5 py-2">
      <div className="flex items-center justify-between">
        <h6 className="text-sm font-semibold">
          {data.commit.message}
        </h6>
        <a 
          target="_blank"
          href={data.html_url} 
          className="border rounded text-xs px-2 py-1 hover:bg-gray-600">
          view commit
        </a>
      </div>
      <div className="flex flex-nowrap items-center mt-2">
          {data.committer?.avatar_url
            ? 
            <div className="h-4 w-4 mr-2">
              <img 
                className="bg-black"
                style={{ borderRadius: '50%' }}
                src={data.committer?.avatar_url} 
                alt="github-user" 
              />
            </div>
            : null
          }
        <p className="text-gray-400 text-xs">
          <span className="text-white font-semibold mr-2">
            {data.committer?.login || data.commit.author.name}
          </span>
          {formatedDate}
        </p>
      </div>
    </div>
  )
}