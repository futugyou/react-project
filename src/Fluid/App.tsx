import React, { useState, useEffect } from "react"
import { FluidProvider } from "./contexts/FluidProvider"
import Timestamp from "./components/Timestamp"
import Members from "./components/Member" 
import { useModel } from "./hooks"

const App = () => {
    const model = useModel()
    return (
        <div className="App">
            <Timestamp></Timestamp>
            <h1>-</h1>
            <Members></Members> 
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