"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeIcon, LocationIcon, StarIcon } from "./ui/icons";

const LoadingSkeleton = () => {
  return Array(8)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="bg-white dark:bg-[#1E1E1E] rounded-md overflow-hidden shadow-md animate-pulse "
      >
        <div className="relative h-56 bg-gray-200 dark:bg-[#2e2d2d]" />
        <div className="p-5">
          <div className="w-56 h-2.5 font-bold bg-gray-200 dark:bg-[#423f3f] rounded-sm mb-3 truncate" />
          <div className="w-36 h-2 font-bold bg-gray-200 dark:bg-[#423f3f] rounded-sm mb-3 truncate" />
        </div>
        <div className="px-5 py-6 bg-neutral-200/50 dark:bg-[#2c2b2b] flex justify-between items-center" />
      </div>
    ));
};

export default function SchoolsList() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/getSchools");
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="min-h-screen  p-1 md:p-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          schools.map((school) => (
            <div
              key={school.id}
              className="bg-white  dark:bg-[#1E1E1E] rounded-md overflow-hidden shadow-md transition-all duration-300 "
            >
              <div className="relative">
                <img
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  className="w-full h-56 object-cover hover:opacity-80 transition-all duration-300 hover:cursor-pointer"
                />
                <div className="absolute top-0 left-0 bg-blue-600 flex items-center justify-center text-white text-xs font-medium text-center px-3 py-1 m-3 rounded-sm">
                  Featured
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 truncate">
                  {school.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 flex items-center">
                  <LocationIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                  {school.address}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                  <HomeIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                  {school.city}
                </p>
              </div>
              <div className="px-5 py-4 bg-gray-50 dark:bg-[#2c2b2b] flex justify-between items-center">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    4.5
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 text-sm font-semibold shadow-md py-2 px-4 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
