import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchBudgets() {
  const res = await fetch("/api/budgets");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useBudgets() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
  });

  const addBudget = useMutation({
    mutationFn: (newBudget) =>
      fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const updateBudget = useMutation({
    mutationFn: ({ id, ...body }) =>
      fetch(`/api/budgets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const deleteBudget = useMutation({
    mutationFn: (id) =>
      fetch(`/api/budgets/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  return {
    budgets: data?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    addBudget,
    updateBudget,
    deleteBudget,
  };
}
