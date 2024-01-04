import data from './data.json'

import { Excalidraw } from "@excalidraw/excalidraw"
import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types"

const elements = data.elements
const appState = data.appState
const scrollToContent = data.scrollToContent

const initialData: ExcalidrawInitialDataState = {
    elements: elements as any,
    appState: appState,
    scrollToContent: scrollToContent,
}

const App = () => {
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
            <div style={{ height: "100%", width: "100%" }}>
                <Excalidraw initialData={initialData} />
            </div>
        </>
    )
}

export default App
