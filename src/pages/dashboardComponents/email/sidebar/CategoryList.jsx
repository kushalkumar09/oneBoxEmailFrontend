"use client";

import { Badge } from "@/components/ui/badge";

export const CategoryList = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="px-3 py-2">
      <h3 className="mb-2 px-3 text-xs font-medium uppercase text-slate-500">
        Categories
      </h3>
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ${
              selectedCategory === category.name
                ? "bg-slate-100 font-medium text-slate-900"
                : "text-slate-600 hover:bg-slate-50"
            } cursor-pointer`}
            onClick={() =>
              onSelectCategory(
                selectedCategory === category.name ? null : category.name
              )
            }
          >
            <div className="flex items-center">
              <div
                className={`mr-2 h-2 w-2 rounded-full ${category.color}`}
              ></div>
              {category.name}
            </div>
            <Badge className="ml-auto bg-slate-100">{category.count}</Badge>
          </button>
        ))}
      </nav>
    </div>
  );
};
