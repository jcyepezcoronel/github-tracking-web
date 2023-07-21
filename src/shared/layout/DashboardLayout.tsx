import { Sidebar } from "./Sidebar"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
      <Sidebar />
      <div className="h-full overflow-auto px-8 py-10 sm:ml-64">
        {children}
      </div>
    </>
  )
}
