export const Pagination = ({
  onPrev,
  onNext
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-10">
      <button 
        onClick={() => onPrev()}
        className="text-gray-300 hover:text-blue-500 hover:underline">
        Prev
      </button>
      <button 
        onClick={() => onNext()}
        className="text-gray-300 hover:text-blue-500 hover:underline">
        Next
      </button>
    </div>
  )
}