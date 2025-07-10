import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createIDBPersister } from '@/Common/ReactQuery/idbPerstster'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            gcTime: Infinity,
            staleTime: 1000 * 60 * 60 * 1, // 1 hour
        },
    },
})

persistQueryClient({
    queryClient,
    persister: createIDBPersister(),
})

export { queryClient }
