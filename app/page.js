"use client";
import Link from "next/link";
import {
  Add01Icon,
  AddToListIcon,
  Moon02Icon,
  Sun03Icon,
} from "./components/ui/icons";
import { useTheme } from "./components/theme-provider";

export default function Home() {
  const { darkMode, setDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#D6DBDC] dark:bg-[#000000] transition-colors duration-200">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {darkMode ? (
          <Sun03Icon className="w-5 h-5 text-white" />
        ) : (
          <Moon02Icon className="w-5 h-5" />
        )}
      </button>
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        School Management
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/add-school"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200"
        >
          <Add01Icon className="mr-2" />
          Add School
        </Link>
        <Link
          href="/schools"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200"
        >
          <AddToListIcon className="mr-2" />
          View Schools
        </Link>
      </div>
    </main>
  );
}
