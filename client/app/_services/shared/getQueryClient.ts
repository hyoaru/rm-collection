import { QueryClient } from "@tanstack/react-query"

export default function getQueryClient(){
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 3
      }
    }
  })
  return queryClient
}