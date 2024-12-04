export const Loading = () => {
  return <div>로딩 중입니다...</div>;
};

export const RevenueLoading = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-100 py-3 px-2 rounded-2xl shadow animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-5"></div>
      </div>
      <div className="h-20 bg-gray-300 rounded mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto"></div>
    </div>
  );
};

export const ProfitLoading = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-100 py-4 px-3 rounded-2xl shadow animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-4"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/2 m-auto"></div>
    </div>
  );
};

export const ExpensesLoading = () => {
  return (
    <div className="col-span-2 flex flex-col justify-between bg-gray-100 py-3 px-2 rounded-2xl shadow h-56 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5"></div>
      </div>
      <div className="flex justify-center items-center gap-8 h-full">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col justify-center">
          <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
          <div className="h-3 bg-gray-300 rounded mb-2 w-1/3 mx-auto"></div>
          <ul className="space-y-1">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="flex justify-center items-center">
                <div className="inline-block w-3 h-3 mr-2 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const GoalLoading = () => {
  return (
    <div className="col-span-2 flex flex-col justify-between bg-gray-100 py-4 px-5 rounded-2xl shadow animate-pulse h-56">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-5"></div>
      </div>
      
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
          <div className="h-4 bg-gray-300 rounded w-12 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-4 bg-gray-300 rounded w-12 mb-2"></div> 
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};