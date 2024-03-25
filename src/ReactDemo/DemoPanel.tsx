
import React from "react"

import { TotalRouteDescriptions } from "@/RouteDescription"
import SplitPanel from "@/Common/SplitPanel"

const DemoPanel = (props: any) => {
    const items = TotalRouteDescriptions.filter(p => p.archived)

    return (
        <SplitPanel Route={items} />
    )
}

export default React.memo(DemoPanel)
