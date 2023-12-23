import React, { useState, useEffect } from "react"
import { TinyliciousClient } from "@fluidframework/tinylicious-client"
import { SharedMap, LoadableObjectRecord } from "fluid-framework"

const getFluidData = async () => {
    // 1: Configure the container.
    const client = new TinyliciousClient()
    const containerSchema = {
        initialObjects: { sharedTimestamp: SharedMap }
    }
    // 2: Get the container from the Fluid service.
    let container
    const containerId = location.hash.substring(1)
    if (!containerId) {
        ({ container } = await client.createContainer(containerSchema));
        // (container.initialObjects.sharedTimestamp as SharedMap).set("time", Date.now().toString());
        const id = await container.attach()
        location.hash = id
    } else {
        ({ container } = await client.getContainer(containerId, containerSchema))
    }
    // 3: Return the Fluid timestamp object.
    return container.initialObjects
}

const App = () => {
    const [fluidSharedObjects, setFluidSharedObjects] = useState<LoadableObjectRecord>()
    const [localTimestamp, setLocalTimestamp] = useState<any>()

    useEffect(() => {
        getFluidData()
            .then(data => setFluidSharedObjects(data))
    }, [])

    useEffect(() => {
        if (fluidSharedObjects) {
            // 4: Set the value of the localTimestamp state object that will appear in the UI.
            const { sharedTimestamp } = fluidSharedObjects
            const sharedMap = sharedTimestamp as SharedMap
            const updateLocalTimestamp = () => setLocalTimestamp({
                time: sharedMap.get("time"),
            })
            updateLocalTimestamp()

            // 5: Register handlers.
            sharedMap.on("valueChanged", updateLocalTimestamp)
            // 6: Delete handler registration when the React App component is dismounted.
            return () => {
                sharedMap.off("valueChanged", updateLocalTimestamp)
            }
        } else {
            return // Do nothing because there is no Fluid SharedMap object yet.
        }
    }, [fluidSharedObjects])

    const updateTime = () => {
        if (fluidSharedObjects) {
            const { sharedTimestamp } = fluidSharedObjects
            const sharedMap = sharedTimestamp as SharedMap
            sharedMap.set("time", Date.now().toString())
        }
    }

    if (localTimestamp) {
        return (
            <div className="App">
                <button onClick={() => updateTime()}>
                    Get Time
                </button>
                <span>{localTimestamp.time}</span>
            </div>
        )
    } else {
        return <div />
    }
}

export default App