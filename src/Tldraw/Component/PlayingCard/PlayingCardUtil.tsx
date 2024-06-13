import {
    BaseBoxShapeUtil,
    BoundsSnapGeometry,
    HTMLContainer,
    Rectangle2d,
    RecordProps,
    T,
    TLBaseShape,
} from 'tldraw'

type IPlayingCard = TLBaseShape<
    'PlayingCard',
    {
        w: number
        h: number
        suit: string
    }
>

export class PlayingCardUtil extends BaseBoxShapeUtil<IPlayingCard> {
    static override type = 'PlayingCard' as const
    static override props: RecordProps<IPlayingCard> = {
        w: T.number,
        h: T.number,
        suit: T.string,
    }

    override isAspectRatioLocked = (_shape: IPlayingCard) => true

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
        return new Rectangle2d({
            width: shape.props.h / 4.5,
            height: shape.props.h / 4.5,
            isFilled: true,
        })
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