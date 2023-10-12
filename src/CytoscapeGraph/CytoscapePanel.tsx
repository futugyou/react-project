import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'

import React, { useCallback, useEffect, useState } from 'react'
import Select from "@cloudscape-design/components/select"
import Button from "@cloudscape-design/components/button"

import cytoscape from 'cytoscape'
import avsdf from 'cytoscape-avsdf'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from './Styling/GraphStyling'

import data from './data/data.json'

cytoscape.use(avsdf)
cytoscape.use(euler)
cytoscape.use(fcose)

const CytoscapePanel = () => {
    const [selectedOption, setSelectedOption] = React.useState({ label: "fcose", value: "fcose" })

    const onSelectChange = ({ detail }: any) => {
        setSelectedOption(detail.selectedOption)
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

    const elements3: any = data

    const layout = { name: selectedOption.value }

    const handleDoubleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        let position = node.position()
        console.log('handleDoubleTap', node)
        const nodeid = `random_nodeid_${+new Date()}`
        const edgeid = `random_edgeid_${+new Date()}`
        event.cy.add({
            group: 'nodes',
            data: { id: nodeid, weight: 75 },
            position: { x: position.x + 30, y: position.y + 30 },
            "selected": false,
            "selectable": true,
            "locked": false,
            "grabbable": true,
            "classes": ""
        })

        event.cy.add({
            "data": {
                "id": edgeid,
                "sbgnclass": "consumption",
                "sbgncardinality": 0,
                "source": nodeid,
                "target": node.id(),
                "portsource": nodeid,
                "porttarget": node.id()
            },
            "group": "edges",
            "selected": false,
            "selectable": true,
            "locked": false,
            "grabbable": true,
            "classes": ""
        })

        node.layout(layout).run()
    }, [])

    const handleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        console.log('handleTap', node)
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

        cyRef.current = cy
    }, [handleDoubleTap, handleTap])

    const cyRef = React.useRef<cytoscape.Core>()
    const downLoad = () => {
        if (cyRef && cyRef.current) {
            cyRef.current.resize()
            const j = cyRef.current.json()
            console.log(j)
            var png64 = cyRef.current.png({ full: true })
            document.querySelector('#png-eg')!.setAttribute('src', png64)
            var jpg64 = cyRef.current.jpg({ full: true })
            document.querySelector('#jpg-eg')!.setAttribute('src', jpg64)
        }
    }

    return (
        <div className="cytoscapePanel">
            <div className='layoutController'>
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
                elements={elements3}
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

export default CytoscapePanel