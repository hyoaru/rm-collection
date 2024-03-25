import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 3
    }
  }
})

const getQueryClient = () => queryClient
export default getQueryClient;