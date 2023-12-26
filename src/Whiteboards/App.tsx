import React, { useState, useEffect } from "react"
import { TinyliciousClient } from "@fluidframework/tinylicious-client"
import { SharedCell } from "@fluidframework/cell"
import { SignalManager } from "@fluid-experimental/data-objects"
import { SharedMap, LoadableObjectRecord, ContainerSchema, IMember } from "fluid-framework"

const containerSchema: ContainerSchema = {
    initialObjects: {
        sharedTimestamp: SharedMap,
        map: SharedMap,
        signalManager: SignalManager,
    },
    dynamicObjectTypes: [SharedCell],
}
export interface TinyliciousMember extends IMember {
    userName: string;
}

const getFluidData = async () => {
    // 1: Configure the container.
    const client = new TinyliciousClient()

    // 2: Get the container from the Fluid service.
    let container, services
    const containerId = location.hash.substring(1)
    if (!containerId) {
        ({ container, services } = await client.createContainer(containerSchema));
        (container.initialObjects.sharedTimestamp as SharedMap).set("time", Date.now().toString());
        const id = await container.attach()
        location.hash = id
    } else {
        ({ container, services } = await client.getContainer(containerId, containerSchema))
    }

    const audience = services.audience

    const map = container.initialObjects.map as SharedMap
    const newCell = await container.create(SharedCell)
    newCell.set("test data")
    map.set("cell-id", newCell.handle)

    // 3: Return the Fluid timestamp object.
    return { initialObjects: container.initialObjects, members: audience.getMembers(), getMyself: audience.getMyself() }
}

const App = () => {
    const [fluidSharedObjects, setFluidSharedObjects] = useState<LoadableObjectRecord>()
    const [localTimestamp, setLocalTimestamp] = useState<any>()
    const [localDynamicMap, setDynamicMap] = useState<any>()
    const [members, setMembers] = useState<any>()
    const [myself, setMyself] = useState<any>()

    useEffect(() => {
        getFluidData()
            .then(data => {
                setFluidSharedObjects(data.initialObjects)
                const ils: any[] = []
                data.members?.forEach((v: any, k: any) => {
                    ils.push(<li key={k}>{v.userId} : {v.userName}</li>)
                });
                setMembers(ils)
                setMyself(data.getMyself)
            })
    }, [])



    useEffect(() => {
        if (fluidSharedObjects) {
            // 4: Set the value of the localTimestamp state object that will appear in the UI.
            const { sharedTimestamp, map } = fluidSharedObjects
            const sharedMap = sharedTimestamp as SharedMap
            const dynamicMap = map as SharedMap
            const updateLocalTimestamp = () => setLocalTimestamp({
                time: sharedMap.get("time"),
            })
            updateLocalTimestamp()

            // 5: Register handlers.
            sharedMap.on("valueChanged", updateLocalTimestamp)
            const handle = dynamicMap.get("cell-id")
            handle.get().then((cell: SharedCell) => {
                cell.on("valueChanged", (d) => {
                    console.log("valueChanged on dynamic cell: ", d)
                })
            })
            dynamicMap.on("valueChanged", (changed) => {
                if (changed.key === "cell-id") {
                    const handle = dynamicMap.get(changed.key);
                    handle.get().then((cell: SharedCell) => {
                        console.log("valueChanged on map: ", cell.get())
                    })
                }
            })
            // 6: Delete handler registration when the React App component is dismounted.
            return () => {
                sharedMap.off("valueChanged", updateLocalTimestamp)
            }
        } else {
            return // Do nothing because there is no Fluid SharedMap object yet.
        }
    }, [fluidSharedObjects])

    const updateTime = async () => {
        if (fluidSharedObjects) {
            const { sharedTimestamp, map } = fluidSharedObjects
            const sharedMap = sharedTimestamp as SharedMap
            sharedMap.set("time", Date.now().toString())


            const dynamicMap = map as SharedMap
            const cell = await dynamicMap.get("cell-id").get() as SharedCell
            cell.set(Date.now().toString())// this will not trigger valueChanged

            const containerId = location.hash.substring(1)
            const client = new TinyliciousClient()
            const { container } = await client.getContainer(containerId, containerSchema)
            const newCell = await container.create(SharedCell); // Create a new SharedCell
            newCell.set("new dynamic test data")
            dynamicMap.set("cell-id", newCell.handle); // Attach the new SharedCell
        }
    }

    if (localTimestamp) {
        return (
            <div className="App">
                <button onClick={() => updateTime()}>
                    Get Time
                </button>
                <span>{localTimestamp.time}</span>
                <div>
                    <ul>
                        {members}
                    </ul>
                </div>
                <h1>-</h1>
                <div>
                    {myself?.userName}
                </div>
            </div>
        )
    } else {
        return <div />
    }
}

export default App