import { useQuery } from "@tanstack/react-query";

async function fetchTransactions({ month, limit }) {
  const params = new URLSearchParams();
  if (month) params.set("month", month);
  if (limit) params.set("limit", String(limit));

  const query = params.toString();
  const url = `/api/transactions${query ? `?${query}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useTransactions({ month, limit } = {}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", { month, limit }],
    queryFn: () => fetchTransactions({ month, limit }),
  });

  return {
    transactions: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
  };
}
