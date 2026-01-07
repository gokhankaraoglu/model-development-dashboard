import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const result = await fn();
      setState({ loading: false, error: null, data: result });
    } catch (e: unknown) {
      setState({
        loading: false,
        error: e instanceof Error ? e.message : String(e),
        data: null,
      });
    } finally {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
