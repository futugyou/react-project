import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

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

const localStoragePersister = createAsyncStoragePersister({
    storage: window.localStorage,
})

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
})

export { queryClient }
