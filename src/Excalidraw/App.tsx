import styles from './App.module.css'

import init from './data/init.json'
import scene from './data/scene.json'

import { libraryItems } from './data/library'

import { Excalidraw } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI, ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types"
import { useState } from 'react'
import Button from "@cloudscape-design/components/button"

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
                <div className={styles.header}>
                    <Button onClick={initState}>InitState</Button>
                    <Button onClick={updateScene}>UpdateScene</Button>
                    <Button onClick={loadLibrary}>LoadLibrary</Button>
                </div>
                <div className={styles.excalidrawContainer}>
                    <Excalidraw
                        initialData={initialData}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)} />
                </div>
            </div>
        </>
    )
}

export default App
