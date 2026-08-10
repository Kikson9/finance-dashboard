import { useFetch } from "./useFetch";

export function useTransactions({ month, limit } = {}) {
  const params = new URLSearchParams();
  if (month) params.set("month", month);
  if (limit) params.set("limit", String(limit));

  const query = params.toString();
  const url = `/api/transactions${query ? `?${query}` : ""}`;

  const { data, loading, error } = useFetch(url);

  return {
    transactions: data?.data ?? [],
    total: data?.total ?? 0,
    loading,
    error,
  };
}
