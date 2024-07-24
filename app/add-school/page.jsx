"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Loading03Icon, PlusIcon } from "@/app/components/ui/icons";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.post("/api/addSchool", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      router.push("/schools");
    } catch (error) {
      console.error("Error adding school:", error);
      setIsLoading(false);
      alert("Error adding school. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#080808] py-8">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-lg border border-solid dark:border-[#1E1E1E] bg-white dark:bg-[#1E1E1E]">
        <h1 className="text-3xl font-bold mb-8 dark:text-white text-center text-gray-800">
          Add School
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {["name", "address", "city", "state", "contact", "email_id"].map(
            (field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium dark:text-gray-300 text-gray-600 mb-1"
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace("_", " ")}
                </label>
                <input
                  id={field}
                  {...register(field, {
                    required: true,
                    ...(field === "contact" ? { pattern: /^\d{10}$/ } : {}),
                  })}
                  className="flex-grow py-2.5 w-full border border-gray-300 dark:border-slate-800 focus:border-gray-800 dark:focus:border-gray-700 pl-3 focus:border-l-green-500 dark:focus:border-l-green-600 p-2 bg-inherit rounded-xl text-secondary-foreground resize-none focus:outline-none text-sm transition-colors duration-300 ]"
                  placeholder={`Enter ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                />
                {errors[field] && (
                  <span className="text-red-500 text-xs mt-1 font-medium">
                    {field === "contact"
                      ? "Please enter a valid 10-digit number"
                      : "This field is required"}
                  </span>
                )}
              </div>
            )
          )}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium dark:text-gray-300 text-gray-600 mb-2"
            >
              Image
            </label>
            <div className="relative">
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer  hover:bg-gray-200 dark:hover:bg-[#2c2b2b] transition-colors duration-300"
              >
                <PlusIcon />
                <span className="text-sm dark:text-gray-300 text-gray-600">
                  Choose an image or drag it here
                </span>
              </label>
            </div>
            {errors.image && (
              <span className="text-red-500 text-xs mt-2 block">
                This field is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loading03Icon className="animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add School"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
