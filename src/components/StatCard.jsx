import React from "react";
import { Users, UserCheck, TrendingUp } from "lucide-react";
const StatCard = ({ value, length }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border-l-4 ${
        value === "Total Users"
          ? "border-blue-500"
          : value === "Active"
          ? "border-green-500"
          : "border-purple-500"
      } `}
    >
      <div className="flex items-center">
        <div className="p-1 sm:p-2 bg-blue-100 rounded-full">
          {value === "Total Users" ? (
            <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
          ) : value === "Active" ? (
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
          ) : (
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
          )}
        </div>
        <div className="ml-2 sm:ml-3 md:ml-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {value}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            {length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
