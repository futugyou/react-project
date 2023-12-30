import React, { useState, useEffect } from "react"
import { FluidProvider } from "./contexts/FluidProvider"
import { useGetTimestampStore } from "./store"

const App = () => {
    const {
        dispatch,
        actions: { editTimestamp },
        queries: { getTimestamp },
    } = useGetTimestampStore()

    const currentTimestamp = getTimestamp()

    const updateTime = () => {
        dispatch(
            editTimestamp(),
        )
    }
    return (
        <div className="App">
            <button onClick={() => updateTime()}>
                Get Time
            </button>
            {/* <span>{model?.getSharedTimestamp()}</span> */}
            <span>{currentTimestamp}</span>
            <div>
                <ul>
                    {/* {members} */}
                </ul>
            </div>
            <h1>-</h1>
            <div>
                {/* {myself?.userName} */}
            </div>
        </div>
    )

}

const AppProvider = () => {
    return (
        <FluidProvider>
            <App></App>
        </FluidProvider>
    )
}

export default AppProvider  