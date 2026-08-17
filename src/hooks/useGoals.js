import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchGoals() {
  const res = await fetch("/api/goals");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useGoals() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  const addGoal = useMutation({
    mutationFn: (newGoal) =>
      fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal),
      }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  const updateGoal = useMutation({
    mutationFn: ({ id, ...body }) =>
      fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  const deleteGoal = useMutation({
    mutationFn: (id) =>
      fetch(`/api/goals/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  return {
    goals: data?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    addGoal,
    updateGoal,
    deleteGoal,
  };
}
