import styles from './App.module.css'
import { useRef, useState, useEffect } from 'react'

import {
    Excalidraw, serializeAsJSON, Sidebar, exportToCanvas, exportToClipboard,
    convertToExcalidrawElements,
} from "@excalidraw/excalidraw"
import {
    ExcalidrawImperativeAPI, ExcalidrawInitialDataState,
    LibraryItem, UIAppState,
} from "@excalidraw/excalidraw/types/types"
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw"

import uniqBy from "lodash/uniqBy"

import { AppMainMenu } from "./components/AppMainMenu"
import { AppWelcomeScreen } from "./components/AppWelcomeScreen"
import { MenuItem } from "./components/MenuItem"
import { SidebarTriggerItem } from "./components/SidebarTriggerItem"

import init from './data/init.json'
import { libraryItems } from './data/library'
import { useHandleLibrary } from './hook/library'
import { mermaid_string } from './data/mermaid'

const elements = init.elements
const appState = init.appState
const scrollToContent = init.scrollToContent

const initialData: ExcalidrawInitialDataState = {
    elements: elements as any,
    appState: appState,
    scrollToContent: scrollToContent,
}

const excalidraw_storage_key = "excalidraw_storage_key"
const export_canvas_key = "export_canvas_key"

const App = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
    const [librarys, setLibrarys] = useState<LibraryItem[]>(libraryItems as any)
    const [docked, setDocked] = useState(false)
    const [canvasUrl, setCanvasUrl] = useState("")

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

    const loadMermaid = async () => {
        if (!excalidrawAPI) {
            return
        }

        const { elements, files } = await parseMermaidToExcalidraw(mermaid_string, {
        })
        const excalidrawElements = convertToExcalidrawElements(elements)
        excalidrawAPI.updateScene({
            elements: excalidrawElements,
        })
        excalidrawAPI.scrollToContent(excalidrawAPI.getSceneElements(), {
            fitToContent: true,
        })
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

    const exportCanvas = async (open: boolean) => {
        if (!excalidrawAPI || !open) {
            return
        }
        const elements = excalidrawAPI.getSceneElements()
        if (!elements || !elements.length) {
            return
        }
        const canvas = await exportToCanvas({
            elements,
            appState: {
                ...initialData.appState,
                exportWithDarkMode: false,
            },
            files: excalidrawAPI.getFiles(),
        })
        const ctx = canvas.getContext("2d")!
        setCanvasUrl(canvas.toDataURL())
        exportToClipboard({
            elements,
            appState: {
                ...initialData.appState,
                exportWithDarkMode: false,
            },
            files: excalidrawAPI.getFiles(),
            mimeType: "image/png",
            type: "png"
        })
    }

    const renderTopRightUI = (isMobile: boolean, appState: UIAppState) => {
        return (
            <>
                <SidebarTriggerItem text="ToClipboard" name={export_canvas_key} onToggle={exportCanvas} />
            </>
        )
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
                    <Excalidraw renderTopRightUI={renderTopRightUI}
                        // initialData={initialData}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)} >
                        <Sidebar name={export_canvas_key} docked={docked} onDock={setDocked}>
                            <Sidebar.Header />
                            <Sidebar.Tabs >
                                <div className="export export-canvas">
                                    <img src={canvasUrl} alt="" />
                                </div>
                            </Sidebar.Tabs>
                        </Sidebar>

                        <AppMainMenu>
                            <MenuItem onClick={initState} text="Default Data" ></MenuItem>
                            <MenuItem onClick={loadLibrary} text="Load Library" ></MenuItem>
                            <MenuItem onClick={updateScene} text="Load Local" ></MenuItem>
                            <MenuItem onClick={exportJson} text="Save Local" ></MenuItem>
                        </AppMainMenu>
                        <AppWelcomeScreen items={
                            [
                                { text: "Default Data", onSelect: initState },
                                { text: "Load Mermaid ", onSelect: loadMermaid }
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
