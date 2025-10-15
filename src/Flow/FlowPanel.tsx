
import React from "react"

import SplitPanel from "@/Common/Components/SplitPanel"
import { FlowRouteDataList } from "./FlowRoute"

const FlowPanel = (props: any) => {
    const items = FlowRouteDataList.children!

    return (
        <SplitPanel Route={items} Prefix={"/flow/"} />
    )
}

export default React.memo(FlowPanel)
