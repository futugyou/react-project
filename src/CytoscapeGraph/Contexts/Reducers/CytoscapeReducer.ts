
import cytoscape from 'cytoscape'

export interface CytoscapeState {
    Core: cytoscape.Core
    Data: CytoscapeData
    Layout: string
}

export type CytoscapeData = cytoscape.ElementDefinition[]

export enum ActionType {
    SetCyCore,
    SetResource,
    ChangeLayout,
}

export interface SetCyCoreAction {
    Core: cytoscape.Core
    type: ActionType.SetCyCore
}

export interface SetResourceAction {
    Data: CytoscapeData
    type: ActionType.SetResource
}

export interface ChangeLayoutAction {
    Layout: string
    type: ActionType.ChangeLayout
}

export type CytoscapeAction =
    | SetCyCoreAction
    | SetResourceAction
    | ChangeLayoutAction

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
        case ActionType.ChangeLayout:
            return {
                ...state,
                Layout: action.Layout,
            }
        default:
            return state
    }
}
