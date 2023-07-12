"use client";

import { categoryFilters } from "@/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (filter: string) => {
    router.push(`${pathName}?category=${filter}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex">
      <ul className="flex gap-2 overflow-auto">
        <button
          type="button"
          onClick={() => router.push(`/`)}
          className={`${
            pathName === "/" && category === null
              ? "bg-light-white-300 font-medium"
              : "font-normal"
          } px-4 py-3 rounded-lg capitalize whitespace-nowrap `}
        >
          All
        </button>
        {categoryFilters.map((filters) => (
          <button
            key={filters}
            type="button"
            onClick={() => handleTags(filters)}
            className={`${
              category === filters
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap `}
          >
            {filters}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
