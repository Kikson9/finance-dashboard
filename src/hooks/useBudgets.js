import { useFetch } from "./useFetch";

export function useBudgets() {
  const { data, loading, error } = useFetch("/api/budgets");
  return {
    budgets: data?.data ?? [],
    loading,
    error,
  };
}
