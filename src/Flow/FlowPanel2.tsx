
import React from "react"

import SplitPanel from "@/Common/SplitPanel"
import { FlowRouteDataList2 } from "./FlowRoute"

const FlowPanel = (props: any) => {
    const items = FlowRouteDataList2.children!

    return (
        <SplitPanel Route={items} Prefix={"/flow/"} />
    )
}

export default React.memo(FlowPanel)
