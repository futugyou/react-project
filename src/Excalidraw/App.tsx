import styles from './App.module.css'
import { useRef, useState } from 'react'

import { Excalidraw } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI, ExcalidrawInitialDataState }
    from "@excalidraw/excalidraw/types/types"

import { AppMainMenu } from "./menu/AppMainMenu"
import { AppWelcomeScreen } from "./menu/AppWelcomeScreen"
import { MenuItem } from "./menu/MenuItem"

import init from './data/init.json'
import scene from './data/scene.json'
import { libraryItems } from './data/library'

const elements = init.elements
const appState = init.appState
const scrollToContent = init.scrollToContent

const initialData: ExcalidrawInitialDataState = {
    elements: elements as any,
    appState: appState,
    scrollToContent: scrollToContent,
}

const App = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()

    const updateScene = () => {
        if (!excalidrawAPI) {
            return
        }

        const elements = scene.elements
        const appState = scene.appState
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
            libraryItems: libraryItems as any,
            openLibraryMenu: true,
            merge: true,
            // prompt: true,
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.excalidrawContainer}>
                    <Excalidraw
                        // initialData={initialData}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)} >
                        <AppMainMenu>
                            <MenuItem onClick={initState} Text="InitState" ></MenuItem>
                            <MenuItem onClick={updateScene} Text="UpdateScene" ></MenuItem>
                            <MenuItem onClick={loadLibrary} Text="LoadLibrary" ></MenuItem>
                        </AppMainMenu>
                        <AppWelcomeScreen items={[{ text: "InitState", onSelect: initState }]}>
                        </AppWelcomeScreen>
                    </Excalidraw>
                </div>
            </div>
        </>
    )
}

export default App
