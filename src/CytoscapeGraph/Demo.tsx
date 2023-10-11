import './Demo.css'

import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import CytoscapeComponent from 'react-cytoscapejs'

Cytoscape.use(COSEBilkent)

const Demo = () => {
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ]
    const elements2 = {
        nodes: [
            { data: { id: 'one', label: 'Node 1' },   },
            { data: { id: 'two', label: 'Node 2' },   }
        ],
        edges: [
            {
                data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
            }
        ]
    }
    const layout = { name: 'cose-bilkent' }
    return <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements2)}
        layout={layout}
        style={{
            width: '100%',
            height: `100%`,
            boxSizing: 'border-box',
            zIndex: 0,
            border: '1px solid #dedede',
        }}
        stylesheet={[
            {
                selector: 'node',
                style: {
                    shape: 'rectangle'
                }
            },
            {
                selector: 'edge',
                style: {
                }
            }
        ]}
    />
}

export default Demo