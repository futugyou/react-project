import {
    BaseBoxShapeUtil,
    BoundsSnapGeometry,
    HTMLContainer,
    Rectangle2d,
    RecordProps,
    T,
    TLShape,
    TLBaseShape,
} from 'tldraw'

const PLAYING_CARD_TYPE = 'PlayingCard'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[PLAYING_CARD_TYPE]: {
			w: number
			h: number
			suit: string
		}
	}
}

export type IPlayingCard = TLShape<typeof PLAYING_CARD_TYPE>

export class PlayingCardUtil extends BaseBoxShapeUtil<IPlayingCard> {
	static override type = PLAYING_CARD_TYPE
	static override props: RecordProps<IPlayingCard> = {
		w: T.number,
		h: T.number,
		suit: T.string,
	}

	override isAspectRatioLocked(_shape: IPlayingCard) {
		return true
	}

	getDefaultProps(): IPlayingCard['props'] {
		const cardSuitsArray: string[] = ['♠️', '♣️', '♥️', '♦️']
		const randomSuit = cardSuitsArray[Math.floor(Math.random() * cardSuitsArray.length)]
		return {
			w: 270,
			h: 370,
			suit: randomSuit,
		}
	}

	override getBoundsSnapGeometry(shape: IPlayingCard): BoundsSnapGeometry {
		return {
			points: new Rectangle2d({
				width: shape.props.h / 4.5,
				height: shape.props.h / 4.5,
				isFilled: true,
			}).bounds.cornersAndCenter,
		}
	}

	component(shape: IPlayingCard) {
		return (
			<HTMLContainer
				style={{
					height: shape.props.h,
					width: shape.props.w,
					backgroundColor: 'white',
					boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 8,
				}}
				id={shape.id}
			>
				<span
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: shape.props.h / 4.5,
						width: shape.props.h / 4.5,
						fontSize: shape.props.h / 5,
					}}
				>
					{shape.props.suit}
				</span>
				<div style={{ fontSize: shape.props.h / 3 }}>{shape.props.suit}</div>
			</HTMLContainer>
		)
	}

	indicator(shape: IPlayingCard) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}