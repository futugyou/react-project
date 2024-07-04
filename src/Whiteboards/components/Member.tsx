import React, { useState, useEffect } from "react"
import { useGetMembersStore } from "../store"

const Members = () => {
    // const [show, setShow] = useState(false)

    const {
        dispatch,
        actions: { updateName },
        queries: { getMembers },
    } = useGetMembersStore()

    const updateMemberName = (userId: string) => {
        dispatch(
            updateName({ userId, userName: "fake name" }),
        )
    }

    const members = getMembers()
    const memberli = members.map((m) => (
        <li key={m.id} onClick={() => updateMemberName(m.id)} >
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