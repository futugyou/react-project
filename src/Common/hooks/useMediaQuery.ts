import { useCallback, useSyncExternalStore } from "react"

const useMediaQuery = (query: string) => {
    const subscribe = useCallback((callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => {
        const matchMedia = window.matchMedia(query)
        matchMedia.addEventListener("change", callback)
        return () => {
            matchMedia.removeEventListener("change", callback)
        }
    }, [query])

    const getSnapshot = () => {
        return window.matchMedia(query).matches
    }

    return useSyncExternalStore(subscribe, getSnapshot)
}

export default useMediaQuery