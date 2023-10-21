import { fetchImage } from "@/CytoscapeGraph/NodeFactory/ImageSelector"

export const getExpandCollapseGraphLayout = () => {
    return {
        layoutBy: {
            name: "fcose",
            animate: true,
            randomize: false,
            fit: true
        },
        cueEnabled: true,
        fisheye: false,
        animate: true,
        undoable: false,
        expandCollapseCuePosition: 'top-left', // default cue position is top left you can specify a function per node too
        expandCollapseCueSize: 12, // size of expand-collapse cue
        expandCollapseCueLineSize: 8, // size of lines used for drawing plus-minus icons
        expandCueImage: fetchImage('expand'),
        collapseCueImage: fetchImage('collapse'),
    }
}

export const getGridGuide = () => {
    return {
        snapToGridOnRelease: true, // Snap to grid on release
        snapToGridDuringDrag: false, // Snap to grid during drag
        snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
        snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
        distributionGuidelines: false, //Distribution guidelines
        geometricGuideline: false, // Geometric guidelines
        initPosAlignment: false, // Guideline to initial mouse position
        centerToEdgeAlignment: false, // Center tı edge alignment
        resize: false, // Adjust node sizes to cell sizes
        parentPadding: false, // Adjust parent sizes to cell sizes by padding
        drawGrid: true, // Draw grid background

        // General
        gridSpacing: 20, // Distance between the lines of the grid.
        snapToGridCenter: true, // Snaps nodes to center of gridlines. When false, snaps to gridlines themselves.
        zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
        panGrid: false, // Determines whether the grid should move then the user moves the graph if grid is drawn.
        gridStackOrder: -1, // Namely z-index
        gridColor: '#dedede', // Color of grid lines
        lineWidth: 1.0, // Width of grid lines
        guidelinesStackOrder: 4, // z-index of guidelines
        guidelinesTolerance: 2.00, // Tolerance distance for rendered positions of nodes' interaction.
        guidelinesStyle: { // Set ctx properties of line. Properties are here:
            strokeStyle: "#8b7d6b", // color of geometric guidelines
            geometricGuidelineRange: 400, // range of geometric guidelines
            range: 100, // max range of distribution guidelines
            minDistRange: 10, // min range for distribution guidelines
            distGuidelineOffset: 10, // shift amount of distribution guidelines
            horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
            verticalDistColor: "#00ff00", // color of vertical distribution alignment
            initPosAlignmentColor: "#0000ff", // color of alignment to initial location
            lineDash: [0, 0], // line style of geometric guidelines
            horizontalDistLine: [0, 0], // line style of horizontal distribıtion guidelines
            verticalDistLine: [0, 0], // line style of vertical distribıtion guidelines
            initPosAlignmentLine: [0, 0], // line style of alignment to initial mouse position
        },

        // Parent Padding
        parentSpacing: -1 // -1 to set paddings of parents to gridSpacing
    }
}
