import React, { createContext, useState, useContext, ReactElement } from 'react'

import cytoscape from 'cytoscape'

export const CytoscapePanelContext = createContext<CytoscapeProps | undefined>(undefined)

interface CytoscapeProps {
    cy: cytoscape.Core
    setCy: React.Dispatch<React.SetStateAction<cytoscape.Core>>
}

export const useCytoscapeCore = (): CytoscapeProps => {
    const context = useContext(CytoscapePanelContext)
    if (context === undefined) {
        throw new Error('useCytoscapeCore must be used within a CytoscapePanelProvider')
    }
    return context
}

export const CytoscapePanelProvider = (props: any): ReactElement => {
    const { children } = props
    const [cy, setCy] = useState(cytoscape({}))
    return (
        <CytoscapePanelContext.Provider value={{ cy, setCy }}>
            {children}
        </CytoscapePanelContext.Provider>
    )
} 