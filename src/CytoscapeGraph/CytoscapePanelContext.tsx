import React, { createContext, useRef, useContext, ReactElement } from 'react'

import cytoscape from 'cytoscape'

export const CytoscapePanelContext = createContext<React.MutableRefObject<cytoscape.Core> | undefined>(undefined)

export const useCytoscapeCore = (): React.MutableRefObject<cytoscape.Core> => {
    const context = useContext(CytoscapePanelContext)
    if (context === undefined) {
        throw new Error('useCytoscapeCore must be used within a CytoscapePanelProvider')
    }
    return context
}

export const CytoscapePanelProvider = (props: any): ReactElement => {
    const { children } = props
    const cyRef = useRef(cytoscape({}))
    return (
        <CytoscapePanelContext.Provider value={cyRef}>
            {children}
        </CytoscapePanelContext.Provider>
    )
} 