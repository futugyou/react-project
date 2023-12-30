import React, { useState, useEffect } from "react"
import { useGetTimestampStore } from "../store"

const Timestamp = () => {
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
        <div>
            <button onClick={() => updateTime()}>
                Get Time
            </button>
            <span>{currentTimestamp}</span>
        </div>
    )
}

export default Timestamp  