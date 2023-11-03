
import cytoscape from 'cytoscape'

export interface CytoscapeState {
    Core: cytoscape.Core
}

export type CytoscapeAction =
    | {
        Core: cytoscape.Core
        type: "setCyCore"
    }


export const CytoscapePanelReducer = (state: CytoscapeState, action: CytoscapeAction): CytoscapeState => {
    switch (action.type) {
        case 'setCyCore':
            return {
                ...state,
                Core: action.Core,
            }
        default:
            return state
    }
}
