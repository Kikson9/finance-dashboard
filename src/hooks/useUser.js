import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return {
    user: data?.data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}
