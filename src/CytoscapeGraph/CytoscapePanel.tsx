import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'

import React, { useCallback, useEffect, useState } from 'react'
import Select from "@cloudscape-design/components/select"

import Cytoscape from 'cytoscape'
import avsdf from 'cytoscape-avsdf'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from './Styling/GraphStyling'

import data from './data/data.json'

Cytoscape.use(avsdf) 
Cytoscape.use(euler)
Cytoscape.use(fcose) 

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
                        { label: "avsdf", value: "avsdf" },                        
                        { label: "euler", value: "euler" },
                        { label: "fcose", value: "fcose" }, 
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