import './CytoscapePanel.css'
import '@cloudscape-design/global-styles/index.css'
import * as R from 'ramda'
import React, { useCallback, useEffect, useState, useRef } from 'react'

import { Modal } from '@cloudscape-design/components'
import cytoscape from 'cytoscape'
import gridGuide from 'cytoscape-grid-guide'

import CytoscapeComponent from 'react-cytoscapejs'

import { graphStyle } from '@/CytoscapeGraph/Styling/GraphStyling'

import { useCytoscapeCore, CytoscapePanelProvider } from '@/CytoscapeGraph/Contexts/CytoscapeContext'
import CytoscapeController from '@/CytoscapeGraph/CytoscapeController'
import expandCollapse from 'cytoscape-expand-collapse'
import { getExpandCollapseGraphLayout, getGridGuide } from '@/CytoscapeGraph/Layouting/CytoscapeLayout'

gridGuide(cytoscape)
expandCollapse(cytoscape)

const CytoscapePanel = () => {
    const { state: { Core: cy }, dispatch } = useCytoscapeCore()

    const [visible, setVisible] = useState(false)
    const [controllerVisible, setControllerVisible] = useState(false)
    const [selectedNode, setSelectedNode] = useState(null)

    const expandAPI = useRef<any>()
    const cyRef = useRef<any>()

    const handleDoubleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        if (expandAPI.current?.isCollapsible(node)) {
            expandAPI.current.collapseRecursively(node)
        } else if (expandAPI.current?.isExpandable(node)) {
            expandAPI.current.expandRecursively(node)
        }
    }, [])

    const handleTap = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        // const node = event.target
        // node.addClass('selected')
    }, [])

    const handleUnselect = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        // const node = event.target
        // node.lock()
        // node.removeClass('selected')
    }, [])

    const handleClick = useCallback((event: cytoscape.EventObject, extraParams?: any) => {
        const node = event.target
        if (node.data().detailsComponent) {
            setSelectedNode(node.data().detailsComponent)
            setVisible(true)
        } else {
            setSelectedNode(null)
            setVisible(false)
        }
    }, [])

    const updateCytoscapeCore = useCallback((cy: cytoscape.Core) => {
        dispatch({
            type: 'setCyCore',
            Core: cy,
        })
    }, [dispatch])

    const cyCallback = useCallback((cy: cytoscape.Core) => {
        cy.removeListener('select', 'node')
        cy.removeListener('dbltap', 'node')
        cy.removeListener('click', 'node')
        cy.on('dbltap', 'node', handleDoubleTap)
        cy.on('select', 'node', handleTap)
        cy.on('click', 'node', handleClick)
        cy.on('unselect', 'node, node.cy-expand-collapse-collapsed-node', handleUnselect)
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
        var api = cy.expandCollapse('get')
        if (!api) {
            expandAPI.current = cy.expandCollapse(getExpandCollapseGraphLayout())
        }

        cy.gridGuide(getGridGuide())

        cy.ready(() => {
            const removeHighlight = setTimeout(
                () => cy.elements().removeClass('highlight'),
                2000
            )
            cyRef.current = cy
            return () => clearTimeout(removeHighlight)
        })


    }, [handleDoubleTap, handleTap, handleUnselect])

    useEffect(() => {
        return () => {
            if (cy) {
                cy.removeAllListeners()
            }
        }
    }, [])

    useEffect(() => {
        if (cyRef.current) {
            updateCytoscapeCore(cyRef.current)
        }
    }, [cyRef, updateCytoscapeCore])

    return (
        <div className="cytoscapePanel">
            <Modal onDismiss={() => setVisible(false)} visible={visible} size="large">
                {selectedNode}
            </Modal>
            <CytoscapeController setVisible={(state) => setControllerVisible(state)} visible={controllerVisible}></CytoscapeController>
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
