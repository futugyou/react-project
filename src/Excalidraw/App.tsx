import styles from './App.module.css'
import { useRef, useState, useEffect } from 'react'

import { Excalidraw, serializeAsJSON } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI, ExcalidrawInitialDataState, LibraryItem, LibraryItems, LibraryItemsSource }
    from "@excalidraw/excalidraw/types/types"
import uniqBy from "lodash/uniqBy"

import { AppMainMenu } from "./components/AppMainMenu"
import { AppWelcomeScreen } from "./components/AppWelcomeScreen"
import { MenuItem } from "./components/MenuItem"

import init from './data/init.json'
import { libraryItems } from './data/library'
import { useHandleLibrary } from './hook/library'

const elements = init.elements
const appState = init.appState
const scrollToContent = init.scrollToContent

const initialData: ExcalidrawInitialDataState = {
    elements: elements as any,
    appState: appState,
    scrollToContent: scrollToContent,
}

const excalidraw_storage_key = "excalidraw_storage_key"

const App = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
    const [librarys, setLibrarys] = useState<LibraryItem[]>(libraryItems as any)

    const getInitialLibraryItems = (): LibraryItem[] => {
        let currentLibrary = librarys
        let items: LibraryItem[] = JSON.parse(window.localStorage.getItem("excalidraw_library_storage_key") || '[]')

        if (items.length > 0) {
            currentLibrary = currentLibrary.concat(items)
        }

        const uniqueLibrary = uniqBy(currentLibrary, (o) => o.id)
        return uniqueLibrary
    }

    useHandleLibrary({
        excalidrawAPI: excalidrawAPI as any,
        getInitialLibraryItems: getInitialLibraryItems,
    })

    const updateScene = () => {
        if (!excalidrawAPI) {
            return
        }

        const state = JSON.parse(window.localStorage.getItem(excalidraw_storage_key) || '{}')

        const elements = state.elements
        const appState = state.appState
        const sceneData = {
            elements: elements,
            appState: appState,
        }

        excalidrawAPI.updateScene(sceneData as any)
    }

    const initState = () => {
        if (!excalidrawAPI) {
            return
        }

        excalidrawAPI.updateScene(initialData as any)
    }

    const loadLibrary = () => {
        if (!excalidrawAPI) {
            return
        }

        excalidrawAPI.updateLibrary({
            libraryItems: librarys as any,
            openLibraryMenu: true,
            merge: true,
            // prompt: true,
        })
    }

    const exportJson = () => {
        if (!excalidrawAPI) {
            return
        }

        const state = serializeAsJSON(
            excalidrawAPI.getSceneElementsIncludingDeleted(),
            excalidrawAPI.getAppState(),
            excalidrawAPI.getFiles(),
            "local",
        )

        window.localStorage.setItem(excalidraw_storage_key, state)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.excalidrawContainer}>
                    <Excalidraw
                        // initialData={initialData}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)} >
                        <AppMainMenu>
                            <MenuItem onClick={initState} Text="Default Data" ></MenuItem>
                            <MenuItem onClick={loadLibrary} Text="Load Library" ></MenuItem>
                            <MenuItem onClick={updateScene} Text="Load Local" ></MenuItem>
                            <MenuItem onClick={exportJson} Text="Save Local" ></MenuItem>
                        </AppMainMenu>
                        <AppWelcomeScreen items={
                            [
                                { text: "Default Data", onSelect: initState },
                                { text: "Load Local", onSelect: updateScene }
                            ]
                        }>
                        </AppWelcomeScreen>
                    </Excalidraw>
                </div>
            </div>
        </>
    )
}

export default App
