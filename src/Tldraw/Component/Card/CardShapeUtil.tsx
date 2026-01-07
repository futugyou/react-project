import { useState } from 'react'
import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLDefaultColorStyle,
	TLResizeInfo,
	TLShape,
	getColorValue,
	getDefaultColorTheme,
	resizeBox,
} from 'tldraw'
import { cardShapeMigrations } from './card-shape-migrations'
import { cardShapeProps } from './card-shape-props'

const CARD_TYPE = 'card'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[CARD_TYPE]: { w: number; h: number; color: TLDefaultColorStyle }
	}
}

export type ICardShape = TLShape<typeof CARD_TYPE>

export class CardShapeUtil extends ShapeUtil<ICardShape> {
	static override type = CARD_TYPE
	static override props = cardShapeProps
	static override migrations = cardShapeMigrations
	override isAspectRatioLocked(_shape: ICardShape) {
		return false
	}
	override canResize(_shape: ICardShape) {
		return true
	}

	getDefaultProps(): ICardShape['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
		}
	}

	getGeometry(shape: ICardShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	component(shape: ICardShape) {
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })

		const [count, setCount] = useState(0)

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: getColorValue(theme, shape.props.color, 'semi'),
					color: getColorValue(theme, shape.props.color, 'solid'),
				}}
			>
				<h2>Clicks: {count}</h2>
				<button
					onClick={() => setCount((count) => count + 1)}
					onPointerDown={(e) => e.stopPropagation()}
				>
					{bounds.w.toFixed()}x{bounds.h.toFixed()}
				</button>
			</HTMLContainer>
		)
	}

	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	override onResize(shape: ICardShape, info: TLResizeInfo<ICardShape>) {
		return resizeBox(shape, info)
	}
} 