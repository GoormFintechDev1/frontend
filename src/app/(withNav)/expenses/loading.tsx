"use client";

import { ResponsiveContainer } from "recharts";

const ExpensesPageLoading = () => {
  return (
    <div className="container animate-pulse">
      <div className="col-span-2 flex flex-col justify-between">
        <div className="mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex items-center gap-x-3 mb-4">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-16 h-5 bg-gray-300 rounded"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex mb-4">
          <ResponsiveContainer width="100%" height={200}>
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-8 mb-4">
          <div className="flex flex-col w-full px-6 pt-2 pb-5 border-b-2 border-[#f5f5f5]">
            <ul className="flex flex-col gap-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="inline-block w-3 h-3 bg-gray-300 mr-2"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex gap-x-2">
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPageLoading;