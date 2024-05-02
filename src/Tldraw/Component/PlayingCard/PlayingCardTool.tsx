import { BaseBoxShapeTool } from 'tldraw'

export class PlayingCardTool extends BaseBoxShapeTool {
    static override id = 'PlayingCard'
    static override initial = 'idle'
    override shapeType = 'PlayingCard'
}