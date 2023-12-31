import React, { useState, useEffect } from "react"
import { useGetMembersStore } from "../store"

const Members = () => {
    const {
        dispatch,
        actions: { updateName },
        queries: { getMembers },
    } = useGetMembersStore()

    const members = getMembers()
    const memberli = members.map((m) => (
        <li key={m.userId}>
            {m.userName}
        </li>
    ))

    return (
        <div>
            <ul>
                {memberli}
            </ul>
        </div>
    )
}

export default Members 