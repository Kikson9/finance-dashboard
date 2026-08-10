import { useFetch } from "./useFetch";

export function useGoals() {
  const { data, loading, error } = useFetch("/api/goals");
  return {
    goals: data?.data ?? [],
    loading,
    error,
  };
}
