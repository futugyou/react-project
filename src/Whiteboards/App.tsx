import React, { useState, useEffect } from "react"
import { FluidProvider } from "./contexts/FluidProvider"
import Timestamp from "./components/Timestamp"

const App = () => {

    return (
        <div className="App">
            <Timestamp></Timestamp>
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