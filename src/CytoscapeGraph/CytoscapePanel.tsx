import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'

import React, { useCallback, useEffect, useState } from 'react'
import Select from "@cloudscape-design/components/select"
import Button from "@cloudscape-design/components/button"
import { CytoscapePanelProvider, useCytoscapeCore } from './CytoscapePanelContext'

import TestCom from './TestCom'

import cytoscape from 'cytoscape'
import avsdf from 'cytoscape-avsdf'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'
import gridGuide from 'cytoscape-grid-guide'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from './Styling/GraphStyling'

import singleAccount from './data/singleAccount.json'
import singleAccountDuplicates from './data/singleAccountDuplicates.json'

cytoscape.use(avsdf)
cytoscape.use(euler)
cytoscape.use(fcose)
gridGuide(cytoscape)

const CytoscapePanel = () => {
    const [selectedOption, setSelectedOption] = React.useState({ label: "fcose", value: "fcose" })
    const [dataOption, setDataOption] = React.useState({ label: "aws-data-1", value: "aws-data-1" })

    const onSelectChange = ({ detail }: any) => {
        setSelectedOption(detail.selectedOption)
    }

    const onDataChange = ({ detail }: any) => {
        setDataOption(detail.selectedOption)
        const key: string = detail.selectedOption.value
        if (key == "aws-data-1") {
            cyRef.current?.collection(singleAccount as any)
        }

        if (key == "aws-data-2") {
            cyRef.current?.collection(singleAccountDuplicates as any)
        }
        cyRef.current?.layout(layout).run()
    }

    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ]

    const elements2 = {
        nodes: [
            { data: { id: 'one', label: 'Node 1' }, },
            { data: { id: 'two', label: 'Node 2' }, }
        ],
        edges: [
            {
                data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
            }
        ]
    }

    const elements3: any = singleAccountDuplicates

    const layout = { name: selectedOption.value }

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
        cyRef.current = cy

        cy.collection(singleAccount as any)
        cy.ready(() => {
            const removeHighlight = setTimeout(
                () => cy.elements().removeClass('highlight'),
                2000
            )

            cy.layout(layout).run()
            return () => clearTimeout(removeHighlight)
        })

    }, [handleDoubleTap, handleTap])

    const cyRef = useCytoscapeCore()
    const downLoad = () => {
        if (cyRef && cyRef.current) {
            cyRef.current.resize()
            const j = cyRef.current.json()
            console.log(j)
            var png64 = cyRef.current.png({ full: true })
            document.querySelector('#png-eg')!.setAttribute('src', png64)
            var jpg64 = cyRef.current.jpg({ full: true })
            document.querySelector('#jpg-eg')!.setAttribute('src', jpg64)
            downloadImage(png64, "graph.png")
            downloadImage(jpg64, "graph.jpg")
        }
    }

    const downloadImage = (dataUrl: string, name: string) => {
        const a = document.createElement('a')
        a.setAttribute('download', name)
        a.setAttribute('href', dataUrl)
        a.click()
    }

    useEffect(() => {
        return () => {
            if (cyRef.current) {
                cyRef.current.removeAllListeners()
            }
        }
    }, [])

    return (
        <div className="cytoscapePanel">
            <TestCom></TestCom>
            <div className='layoutController'>
                <div className='controllerItem'>
                    <div className="itemDescription">change layout</div>
                    <div className="itemContent">
                        <Select
                            selectedOption={dataOption}
                            onChange={onDataChange}
                            options={[
                                { label: "aws-data-1", value: "aws-data-1" },
                                { label: "aws-data-2", value: "aws-data-2" },
                            ]}
                        />
                    </div>
                </div>

                <div className='controllerItem'>
                    <div className="itemDescription">change layout</div>
                    <div className="itemContent">
                        <Select
                            selectedOption={selectedOption}
                            onChange={onSelectChange}
                            options={[
                                { label: "avsdf", value: "avsdf" },
                                { label: "euler", value: "euler" },
                                { label: "fcose", value: "fcose" },
                                { label: "random", value: "random" },
                                { label: "grid", value: "grid" },
                                { label: "circle", value: "circle" },
                                { label: "concentric", value: "concentric" },
                                { label: "cose", value: "cose" },
                            ]}
                        />
                    </div>
                </div>
                <div className='controllerItem'>
                    <div className="itemDescription">download image</div>
                    <div className="itemContent">
                        <Button onClick={downLoad}>
                            Download
                        </Button>
                    </div>
                </div>
                <div className='controllerItem'>
                    <div className="itemDescription">png</div>
                    <div className="itemContent">
                        <img id="png-eg" />
                    </div>
                </div>
                <div className='controllerItem'>
                    <div className="itemDescription">jpg</div>
                    <div className="itemContent">
                        <img id="jpg-eg" />
                    </div>
                </div>
            </div>
            <CytoscapeComponent
                cy={cyCallback}
                elements={CytoscapeComponent.normalizeElements([])}
                layout={layout}
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

export default React.memo(CytoscapeProvider)
