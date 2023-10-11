import './Demo.css'

import React, { useCallback, useEffect, useState } from 'react'
import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import CytoscapeComponent from 'react-cytoscapejs'
import { graphStyle } from './Styling/GraphStyling'
import data from './data/data.json'

Cytoscape.use(COSEBilkent)

const Demo = () => {
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

    const layout = { name: 'cose-bilkent' }

    const cyCallback = useCallback((cy: Cytoscape.Core) => {
        cy.on('resize', () => cy.fit(undefined, 20))
    }, [])
    return (
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
    )
}

export default Demo