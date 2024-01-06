import { parseLibraryTokensFromUrl, mergeLibraryItems, loadLibraryFromBlob } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI, LibraryItem, LibraryItems, LibraryItemsSource } from "@excalidraw/excalidraw/types/types"
import { useEffect, useRef } from "react"
import uniqBy from "lodash/uniqBy"

export const APP_NAME = "Excalidraw"

export const URL_QUERY_KEYS = {
    addLibrary: "addLibrary",
} as const

export const useHandleLibrary = ({
    excalidrawAPI,
    getInitialLibraryItems,
}: {
    excalidrawAPI: ExcalidrawImperativeAPI | null
    getInitialLibraryItems?: () => LibraryItem[]
}) => {
    const getInitialLibraryRef = useRef(getInitialLibraryItems)

    useEffect(() => {
        if (!excalidrawAPI) {
            return
        }

        const importLibraryFromURL = async ({
            libraryUrl,
            idToken,
        }: {
            libraryUrl: string
            idToken: string | null
        }) => {
            const libraryPromise = new Promise<Blob>(async (resolve, reject) => {
                try {
                    const request = await fetch(decodeURIComponent(libraryUrl))
                    const blob = await request.blob()
                    resolve(blob)
                } catch (error: any) {
                    reject(error)
                }
            })

            const shouldPrompt = idToken !== excalidrawAPI.id

            // wait for the tab to be focused before continuing in case we'll prompt
            // for confirmation
            await (shouldPrompt && document.hidden
                ? new Promise<void>((resolve) => {
                    window.addEventListener("focus", () => resolve(), {
                        once: true,
                    })
                })
                : null)

            try {
                let library = await libraryPromise
                let libraryItems = await loadLibraryFromBlob(library)

                await excalidrawAPI.updateLibrary({
                    libraryItems: libraryItems,
                    prompt: shouldPrompt,
                    merge: true,
                    defaultStatus: "published",
                    openLibraryMenu: true,
                })

                if (getInitialLibraryRef.current) {
                    const currLibrary = getInitialLibraryRef.current()
                    if (currLibrary.length > 0)
                        libraryItems = currLibrary.concat(libraryItems)
                }

                const uniqueLibrary = uniqBy(libraryItems, (o) => o.id)
                window.localStorage.setItem("excalidraw_library_storage_key", JSON.stringify(uniqueLibrary))
            } catch (error) {
                throw error
            } finally {
                if (window.location.hash.includes("addLibrary")) {
                    const hash = new URLSearchParams(window.location.hash.slice(1))
                    hash.delete("addLibrary")
                    window.history.replaceState({}, APP_NAME, `#${hash.toString()}`)
                } else if (window.location.search.includes(URL_QUERY_KEYS.addLibrary)) {
                    const query = new URLSearchParams(window.location.search)
                    query.delete(URL_QUERY_KEYS.addLibrary)
                    window.history.replaceState({}, APP_NAME, `?${query.toString()}`)
                }
            }
        }
        const onHashChange = (event: HashChangeEvent) => {
            event.preventDefault()
            const libraryUrlTokens = parseLibraryTokensFromUrl()
            if (libraryUrlTokens) {
                event.stopImmediatePropagation()
                // If hash changed and it contains library url, import it and replace
                // the url to its previous state (important in case of collaboration
                // and similar).
                // Using history API won't trigger another hashchange.
                window.history.replaceState({}, "", event.oldURL)

                importLibraryFromURL(libraryUrlTokens)
            }
        }

        // -------------------------------------------------------------------------
        // ------ init load --------------------------------------------------------
        if (getInitialLibraryRef.current) {
            excalidrawAPI.updateLibrary({
                libraryItems: getInitialLibraryRef.current(),
            })
        }

        const libraryUrlTokens = parseLibraryTokensFromUrl()

        if (libraryUrlTokens) {
            importLibraryFromURL(libraryUrlTokens)
        }
        // --------------------------------------------------------- init load -----

        window.addEventListener("hashchange", onHashChange)
        return () => {
            window.removeEventListener("hashchange", onHashChange)
        }
    }, [excalidrawAPI])
}
