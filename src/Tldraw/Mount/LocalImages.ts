import { AssetRecordType, Editor } from "@tldraw/tldraw"

export const LocalImages = (editor: Editor) => {
	const assetId = AssetRecordType.createId()
	const imageWidth = 200
	const imageHeight = 200

	editor.createAssets([
		{
			id: assetId,
			type: 'image',
			typeName: 'asset',
			props: {
				name: 'tldraw.png',
				src: './tldraw/tldraw.png', // You could also use a base64 encoded string here
				w: imageWidth,
				h: imageHeight,
				mimeType: 'image/png',
				isAnimated: true,
			},
			meta: {},
		},
	])
	editor.createShape({
		type: 'image',
		// Let's center the image in the editor
		x: (window.innerWidth - imageWidth) / 2,
		y: (window.innerHeight - imageHeight) / 2,
		props: {
			assetId,
			w: imageWidth,
			h: imageHeight,
		},
	})
}