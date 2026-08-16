import { useQuery } from "@tanstack/react-query";

async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return {
    categories: data?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}
