import {
    TLUiActionsContextType,
    TLUiAssetUrlOverrides,
    TLUiOverrides,
    TLUiToolsContextType,
    TLComponents,
    TLAnyShapeUtilConstructor,
    TLStateNodeConstructor,
} from '@tldraw/tldraw'

import { CustomActionsMenu } from './CustomActionsMenu'
import { CustomContextMenu } from './CustomContextMenu'
import { CustomHelpMenu } from './CustomHelpMenu'
import { CustomKeyboardShortcutsDialog } from './CustomKeyboardShortcutsDialog'
import { CustomMainMenu } from './CustomMainMenu'

import { CustomQuickActions } from './CustomQuickActions'
import { CustomToolbar } from './CustomToolbar'
import { CustomZoomMenu } from './CustomZoomMenu'
import { CustomBrush } from './CustomBrush'
import { CustomScribble } from './CustomScribble'

import CountComponent from './CountComponent'
import ScreenshotBox from './ScreenshotBox'

import { PlayingCardUtil } from '../Shape/PlayingCardShape/PlayingCardUtil'
import { EditableShapeUtil } from '../Shape/EditableShape/EditableShapeUtil'
import { CardShapeUtil } from '../Shape/CardShape/CardShapeUtil'
import { HtmlShapeUtil } from '../Shape/HtmlShape/HtmlShapeUtil'

import { PlayingCardTool } from '../Shape/PlayingCardShape/PlayingCardTool'
import { EditableShapeTool } from '../Shape/EditableShape/EditableShapeTool'
import { CardShapeTool } from '../Shape/CardShape/CardShapeTool'
import { ScreenshotTool } from '../Tools/ScreenshotTool'
import { HeartTool } from '../Tools/HeartTool'

export const UIOverrides: TLUiOverrides = {
    actions(_editor, actions): TLUiActionsContextType {
        const newActions = {
            ...actions,
            'toggle-grid': { ...actions['toggle-grid'], kbd: 'g' },
        }

        return newActions
    },
    tools(editor, tools): TLUiToolsContextType {
        // Create a tool item in the ui's context.
        tools.card = {
            id: 'card',
            icon: 'color',
            label: 'Card',
            kbd: 'c',
            readonlyOk: false,
            onSelect: () => {
                editor.setCurrentTool('card')
            },
        }
        
        tools.screenshot = {
            id: 'screenshot',
            label: 'Screenshot',
            readonlyOk: false,
            icon: 'tool-screenshot',
            kbd: 'j',
            onSelect() {
                editor.setCurrentTool('screenshot')
            },
        }

        tools.hearter = {
            id: 'hearter',
            icon: 'heart-icon',
            label: 'Hearter',
            kbd: 'h',
            onSelect: () => {
                editor.setCurrentTool('hearter')
            },
        }

        tools['editable-shape'] = {
            id: 'editable-shape',
            icon: '',
            label: 'Editable-shape',
            onSelect: () => {
                editor.setCurrentTool('editable-shape')
            },
        }

        tools.PlayingCard = {
            id: 'PlayingCard',
            icon: 'PlayingCard',
            label: 'PlayingCard',
            onSelect: () => {
                editor.setCurrentTool('PlayingCard')
            },
        }

        return tools
    },
}

export const CustomAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'tool-screenshot': '/tldraw/tool-screenshot.svg',
        'heart-icon': '/tldraw/heart-icon.svg',
    },
}

export const CustomeComponents: TLComponents = {
    ActionsMenu: CustomActionsMenu,
    ContextMenu: CustomContextMenu,
    HelpMenu: CustomHelpMenu,
    KeyboardShortcutsDialog: CustomKeyboardShortcutsDialog,
    MainMenu: CustomMainMenu,
    QuickActions: CustomQuickActions,
    Brush: CustomBrush,
    Scribble: CustomScribble,
    InFrontOfTheCanvas: ScreenshotBox,
    OnTheCanvas: CountComponent,
    Toolbar: CustomToolbar,
    ZoomMenu: CustomZoomMenu,
}

export const CustomeShapes: TLAnyShapeUtilConstructor[] = [CardShapeUtil, HtmlShapeUtil, EditableShapeUtil, PlayingCardUtil]

export const CustomTools: TLStateNodeConstructor[] = [CardShapeTool, ScreenshotTool, HeartTool, EditableShapeTool, PlayingCardTool]