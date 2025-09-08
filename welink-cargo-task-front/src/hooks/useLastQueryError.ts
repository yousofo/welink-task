import { IErrorResponse } from "@/lib/apiModels";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function useLastQueryError() {
  const queryClient = useQueryClient();
  const [lastError, setLastError] = useState<IErrorResponse | null>(null);

  useEffect(() => {
    const unsubQueries = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === "updated" && event.query.state.status === "error") {
        setLastError(event.query.state.error);
      }
    });

    const unsubMutations = queryClient.getMutationCache().subscribe((event) => {
      if (event?.type === "added" || event?.type === "updated") {
        if (event.mutation.state.status === "error") {
          setLastError(event.mutation.state.error);
        }
      }
    });

    return () => {
      unsubQueries();
      unsubMutations();
    };
  }, [queryClient]);

  const clearError = () => setLastError(null);

  return { lastError, clearError };
}
