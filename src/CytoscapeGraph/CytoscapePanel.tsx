import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'

import React, { useCallback, useEffect, useState } from 'react'
import Select from "@cloudscape-design/components/select"

import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import cola from 'cytoscape-cola'
import avsdf from 'cytoscape-avsdf'
import cise from 'cytoscape-cise'
import cosmos from "cosmos-over-cytoscape"
import d3Force from 'cytoscape-d3-force'
import dagre from 'cytoscape-dagre'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'
import klay from 'cytoscape-klay'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from './Styling/GraphStyling'

import data from './data/data.json'

Cytoscape.use(COSEBilkent)
Cytoscape.use(cola)
Cytoscape.use(avsdf)
Cytoscape.use(cise)
Cytoscape.use(cosmos)
Cytoscape.use(d3Force)
Cytoscape.use(dagre)
Cytoscape.use(euler)
Cytoscape.use(fcose)
Cytoscape.use(klay)

const CytoscapePanel = () => {
    const [selectedOption, setSelectedOption] = React.useState({ label: "cose-bilkent", value: "cose-bilkent" })

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

    const cyCallback = useCallback((cy: Cytoscape.Core) => {
        cy.on('resize', () => cy.fit(undefined, 20))
    }, [])
    return (
        <div className="cytoscapePanel">
            <div className='layoutSelector'>
                <Select
                    selectedOption={selectedOption}
                    onChange={onSelectChange}
                    options={[
                        { label: "cose-bilkent", value: "cose-bilkent" },
                        { label: "cola", value: "cola" },
                        { label: "avsdf", value: "avsdf" },
                        { label: "cise", value: "cise" },
                        { label: "cosmos", value: "cosmos" },
                        { label: "d3Force", value: "d3-force" },
                        { label: "dagre", value: "dagre" },
                        { label: "euler", value: "euler" },
                        { label: "fcose", value: "fcose" },
                        { label: "klay", value: "klay" },
                        { label: "random", value: "random" },
                        { label: "grid", value: "grid" },
                        { label: "circle", value: "circle" },
                        { label: "concentric", value: "concentric" },
                        { label: "breadthfirst", value: "breadthfirst" },
                        { label: "cose", value: "cose" },
                    ]}
                />
            </div>
            <CytoscapeComponent
                cy={cyCallback}
                elements={elements3}
                layout={layout}
                style={{
                    width: '100%',
                    height: `100%`,
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