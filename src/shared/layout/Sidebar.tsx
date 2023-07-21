import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link 
              to="/repos" 
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              Repositories
            </Link>
          </li>
          <li>
            <div 
              // to="/commits" 
              className="flex items-center p-2 rounded-lg text-gray-400 group">
              Commits
            </div>
          </li>
          <li>
            <Link 
              to="/logout" 
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              Logout
            </Link>
          </li>
        </ul>
      </div>
   </aside>
  )
}