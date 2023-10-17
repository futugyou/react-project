import { Core } from "cytoscape"

declare module "cytoscape" {
    interface Core {
        gridGuide(opt: GridGuideOptions): any
        expandCollapse(opt: any): any
    }
}

interface GridGuideOptions {
    snapToGridOnRelease?: boolean
    snapToGridDuringDrag?: boolean
    snapToAlignmentLocationOnRelease?: boolean
    snapToAlignmentLocationDuringDrag?: boolean
    distributionGuidelines?: boolean
    geometricGuideline?: boolean
    initPosAlignment?: boolean
    centerToEdgeAlignment?: boolean
    resize?: boolean
    parentPadding?: boolean
    drawGrid?: boolean

    gridSpacing?: number
    snapToGridCenter?: boolean
    zoomDash?: boolean
    panGrid?: boolean
    gridStackOrder?: number
    gridColor?: string
    lineWidth?: number
    guidelinesStackOrder?: number
    guidelinesTolerance?: number
    guidelinesStyle?: GuidelinesStyleOptions
    parentSpacing?: number
}

interface GuidelinesStyleOptions {
    strokeStyle?: string
    geometricGuidelineRange?: number
    range?: number
    minDistRange?: number
    distGuidelineOffset?: number
    horizontalDistColor?: string
    verticalDistColor?: string
    initPosAlignmentColor?: string
    lineDash?: number[]
    horizontalDistLine?: number[]
    verticalDistLine?: number[]
    initPosAlignmentLine?: number[]
}