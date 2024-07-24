import SchoolsList from "../components/SchoolsList";

export default function Schools() {
  return (
    <div className="w-full p-4 bg-[#D6DBDC] dark:bg-[#000000]">
      <h1 className="text-3xl font-bold mb-4 pl-10 mt-5 dark:text-white">
        Schools List
      </h1>
      <SchoolsList />
    </div>
  );
}
