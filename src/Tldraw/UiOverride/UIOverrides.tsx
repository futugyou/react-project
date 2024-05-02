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
import ScreenshotBox from '../Component/Screenshot/ScreenshotBox'

import { PlayingCardUtil } from '../Component/PlayingCard/PlayingCardUtil'
import { EditableShapeUtil } from '../Component/Editable/EditableShapeUtil'
import { CardShapeUtil } from '../Component/Card/CardShapeUtil'
import { HtmlShapeUtil } from '../Component/Html/HtmlShapeUtil'

import { PlayingCardTool, ConfigPlayingCardTool, PlayingCardToolBar } from '../Component/PlayingCard/PlayingCardTool'
import { EditableShapeTool, ConfigEditableTool, EditableToolBar } from '../Component/Editable/EditableShapeTool'
import { CardShapeTool, ConfigCardTool, CardToolBar } from '../Component/Card/CardShapeTool'
import { ScreenshotTool, ConfigScreenshotTool, ScreenshotToolBar } from '../Component/Screenshot/ScreenshotTool'
import { HeartTool, ConfigHeartTool, HeartToolBar } from '../Component/Heart/HeartTool'

export const UIOverrides: TLUiOverrides = {
    actions(_editor, actions): TLUiActionsContextType {
        const newActions = {
            ...actions,
            'toggle-grid': { ...actions['toggle-grid'], kbd: 'g' },
        }

        return newActions
    },
    tools(editor, tools): TLUiToolsContextType {
        ConfigCardTool(editor, tools)
        ConfigScreenshotTool(editor, tools)
        ConfigHeartTool(editor, tools)
        ConfigEditableTool(editor, tools)
        ConfigPlayingCardTool(editor, tools)

        return tools
    },
}

export const CustomAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'tool-screenshot': '/tldraw/tool-screenshot.svg',
        'heart-icon': '/tldraw/heart-icon.svg',
    },
}

const CustomeToolBars = [<CardToolBar />, <ScreenshotToolBar />, <HeartToolBar />, <PlayingCardToolBar />, <EditableToolBar />,]

export const CustomeComponents: TLComponents = {
    ActionsMenu: CustomActionsMenu,
    ContextMenu: CustomContextMenu,
    HelpMenu: CustomHelpMenu,
    // this config may be not need?
    // KeyboardShortcutsDialog: CustomKeyboardShortcutsDialog,
    MainMenu: CustomMainMenu,
    QuickActions: CustomQuickActions,
    Brush: CustomBrush,
    Scribble: CustomScribble,
    InFrontOfTheCanvas: ScreenshotBox,
    OnTheCanvas: CountComponent,
    Toolbar: () => <CustomToolbar>{CustomeToolBars}</CustomToolbar>,
    ZoomMenu: CustomZoomMenu,
}

export const CustomeShapes: TLAnyShapeUtilConstructor[] = [CardShapeUtil, HtmlShapeUtil, EditableShapeUtil, PlayingCardUtil]

export const CustomTools: TLStateNodeConstructor[] = [CardShapeTool, ScreenshotTool, HeartTool, EditableShapeTool, PlayingCardTool]
