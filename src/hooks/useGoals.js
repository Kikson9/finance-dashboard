import { useQuery } from "@tanstack/react-query";

async function fetchGoals() {
  const res = await fetch("/api/goals");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useGoals() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  return {
    goals: data?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}
