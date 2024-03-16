import "./chart.css"

import React from "react"

import { Outlet } from "react-router-dom"

const EconomicPanel = (props: any) => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default React.memo(EconomicPanel)