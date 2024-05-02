import {
    HTMLContainer,
    Rectangle2d,
    ShapeUtil,
    TLOnResizeHandler,
    getDefaultColorTheme,
    resizeBox,
} from '@tldraw/tldraw'
import { useState } from 'react'
import { cardShapeMigrations } from './card-shape-migrations'
import { cardShapeProps } from './card-shape-props'
import { ICardShape,MyFilterStyle } from './card-shape-types'

// There's a guide at the bottom of this file!

export class CardShapeUtil extends ShapeUtil<ICardShape> {
    static override type = 'card' as const
    // [1]
    static override props = cardShapeProps
    // [2]
    static override migrations = cardShapeMigrations

    // [3]
    override isAspectRatioLocked = (_shape: ICardShape) => false
    override canResize = (_shape: ICardShape) => true
    override canBind = (_shape: ICardShape) => true

    // [4]
    getDefaultProps(): ICardShape['props'] {
        return {
            w: 300,
            h: 300,
            color: 'black' as never,
            filter: 'none',
        }
    }

    // [5]
    getGeometry(shape: ICardShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }

    // [6]
    component(shape: ICardShape) {
        const bounds = this.editor.getShapeGeometry(shape).bounds
        const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })

        //[a]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [count, setCount] = useState(0)
        const c = theme[shape.props.color] as any
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
                    backgroundColor: c.semi,
                    filter: this.filterStyleToCss(shape.props.filter),
                    color: c.solid,
                }}
            >
                <h2>Clicks: {count}</h2>
                <button
                    // [b]
                    onClick={() => setCount((count) => count + 1)}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    {bounds.w.toFixed()}x{bounds.h.toFixed()}
                </button>
            </HTMLContainer>
        )
    }

    // [7]
    indicator(shape: ICardShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }

    // [8]
    override onResize: TLOnResizeHandler<ICardShape> = (shape, info) => {
        return resizeBox(shape, info)
    }
    
	filterStyleToCss(filter: MyFilterStyle) {
		if (filter === 'invert') return 'invert(100%)'
		if (filter === 'grayscale') return 'grayscale(100%)'
		if (filter === 'blur') return 'blur(10px)'
		return 'none'
	}
}
