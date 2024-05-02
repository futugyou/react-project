import { BaseBoxShapeTool, Editor, TLUiToolsContextType } from 'tldraw'

export class PlayingCardTool extends BaseBoxShapeTool {
    static override id = 'PlayingCard'
    static override initial = 'idle'
    override shapeType = 'PlayingCard'
}

export const ConfigPlayingCardTool = (editor: Editor, tools: TLUiToolsContextType) => {
    tools.PlayingCard = {
        id: 'PlayingCard',
        icon: 'PlayingCard',
        label: 'PlayingCard',
        onSelect: () => {
            editor.setCurrentTool('PlayingCard')
        },
    }
}