import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'

import React, { useCallback, useEffect, useState } from 'react'

import cytoscape from 'cytoscape'
import avsdf from 'cytoscape-avsdf'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'
import gridGuide from 'cytoscape-grid-guide'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from './Styling/GraphStyling'

import { useCytoscapeCore, CytoscapePanelProvider } from '@/CytoscapeGraph/CytoscapePanelContext'
import CytoscapeController from '@/CytoscapeGraph/CytoscapeController'


cytoscape.use(avsdf)
cytoscape.use(euler)
cytoscape.use(fcose)
gridGuide(cytoscape)

const CytoscapePanel = () => {
    const { cy, setCy } = useCytoscapeCore()

    const layout = { name: "fcose" }

    const handleDoubleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        // let position = node.position()
        // console.log('handleDoubleTap', node)
        // const nodeid = `random_nodeid_${+new Date()}`
        // const edgeid = `random_edgeid_${+new Date()}`
        // event.cy.add({
        //     group: 'nodes',
        //     data: { id: nodeid, weight: 75 },
        //     position: { x: position.x + 30, y: position.y + 30 },
        //     "selected": false,
        //     "selectable": true,
        //     "locked": false,
        //     "grabbable": true,
        //     "classes": ""
        // })

        // event.cy.add({
        //     "data": {
        //         "id": edgeid,
        //         "sbgnclass": "consumption",
        //         "sbgncardinality": 0,
        //         "source": nodeid,
        //         "target": node.id(),
        //         "portsource": nodeid,
        //         "porttarget": node.id()
        //     },
        //     "group": "edges",
        //     "selected": false,
        //     "selectable": true,
        //     "locked": false,
        //     "grabbable": true,
        //     "classes": ""
        // })

        // node.layout(layout).run()
    }, [])

    const handleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        // console.log('handleTap', node)
    }, [])

    const cyCallback = useCallback((cy: cytoscape.Core) => {
        cy.removeListener('select', 'node')
        cy.removeListener('dbltap', 'node')
        cy.on('dbltap', 'node', handleDoubleTap)
        cy.on('select', 'node', handleTap)
        cy.on('resize', () => cy.fit(undefined, 120))

        cy.minZoom(0.25)
        cy.maxZoom(2.0)
        cy.on('tapdragover', 'node', function (evt) {
            const node = evt.target
            node.unlock()
            node.grabify()
            node.descendants().unlock()
            node.descendants().grabify()
        })
        cy.on('tapdragout', 'node', function (evt) {
            const node = evt.target
            node.lock()
            node.ungrabify()
            node.descendants().lock()
            node.descendants().ungrabify()
        })

        cy.gridGuide({
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
        })

        cy.ready(() => {
            const removeHighlight = setTimeout(
                () => cy.elements().removeClass('highlight'),
                2000
            )

            return () => clearTimeout(removeHighlight)
        })
        setCy(cy)
    }, [handleDoubleTap, handleTap])

    useEffect(() => {
        return () => {
            if (cy) {
                cy.removeAllListeners()
            }
        }
    }, [])

    return (
        <div className="cytoscapePanel">
            <CytoscapeController></CytoscapeController>
            <CytoscapeComponent
                cy={cyCallback}
                elements={CytoscapeComponent.normalizeElements([])}
                zoomingEnabled={true}
                userZoomingEnabled={true}
                style={{
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    zIndex: 0,
                    border: '1px solid #dedede',
                }}
                stylesheet={graphStyle}
            />

        </div>
    )
}

const CytoscapeProvider = () => {
    return (
        <CytoscapePanelProvider>
            <CytoscapePanel></CytoscapePanel>
        </CytoscapePanelProvider>
    )
}

export default CytoscapeProvider 
