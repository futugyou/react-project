import { DefaultColorStyle, RecordProps, T } from 'tldraw'
import { ICardShape } from './CardShapeUtil'

export const cardShapeProps: RecordProps<ICardShape> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
}
