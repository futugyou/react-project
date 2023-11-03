
import cytoscape from 'cytoscape'

export interface CytoscapeState {
    Core: cytoscape.Core
    Data: CytoscapeData
}

export type CytoscapeData = cytoscape.ElementDefinition[]

export enum ActionType {
    SetCyCore,
    SetResource,
}

export interface SetCyCoreAction {
    Core: cytoscape.Core
    type: ActionType.SetCyCore
}

export interface SetResourceAction {
    Data: CytoscapeData
    type: ActionType.SetResource
}

export type CytoscapeAction =
    | SetCyCoreAction
    | SetResourceAction

export const CytoscapePanelReducer = (state: CytoscapeState, action: CytoscapeAction): CytoscapeState => {
    switch (action.type) {
        case ActionType.SetCyCore:
            return {
                ...state,
                Core: action.Core,
            }
        case ActionType.SetResource:
            return {
                ...state,
                Data: action.Data,
            }
        default:
            return state
    }
}
