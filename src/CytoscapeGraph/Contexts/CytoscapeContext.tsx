import React, { createContext, useState, useContext, ReactElement, useReducer, useMemo } from 'react'

import cytoscape from 'cytoscape'
import { CytoscapePanelReducer, CytoscapeState, CytoscapeAction } from './Reducers/CytoscapeReducer'

const initialState: CytoscapeState = {
    Core: cytoscape({}),
    Data: []
}

export const CytoscapePanelContext = createContext<CytoscapeProps>({
    state: initialState,
    dispatch: () => undefined,
})

interface CytoscapeProps {
    state: CytoscapeState
    dispatch: React.Dispatch<CytoscapeAction>
}

export const useCytoscapeCore = (): CytoscapeProps => {
    const context = useContext(CytoscapePanelContext)
    if (context === undefined) {
        throw new Error('useCytoscapeCore must be used within a CytoscapePanelProvider')
    }
    return context
}

export const CytoscapePanelProvider = (props: any): ReactElement => {
    const [state, dispatch] = useReducer(CytoscapePanelReducer, initialState, (arg) => arg)
    const { children } = props
    const contextValue = useMemo(() => {
        return { state, dispatch }
    }, [state, dispatch])

    return (
        <CytoscapePanelContext.Provider value={contextValue}>
            {children}
        </CytoscapePanelContext.Provider>
    )
} 