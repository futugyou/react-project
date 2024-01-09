import {
	StyleProp,
	T,
	TLBaseShape,
	TLDefaultColorStyle,
} from '@tldraw/tldraw'

export const MyFilterStyle = StyleProp.defineEnum('myApp:filter', {
	defaultValue: 'none',
	values: ['none', 'invert', 'grayscale', 'blur'],
})

export type MyFilterStyle = T.TypeOf<typeof MyFilterStyle>

// A type for our custom card shape
export type ICardShape = TLBaseShape<
	'card',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
		filter: MyFilterStyle
	}
>
