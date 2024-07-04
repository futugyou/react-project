import { AssetRecordType, Editor, createShapeId } from "@tldraw/tldraw"

export const LocalImages = (editor: Editor) => {
	const id = createShapeId('local-image')
	const shape = editor.getShape(id)
	if (shape) {
		return
	}

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
				src: '/tldraw/tldraw.png', // You could also use a base64 encoded string here
				w: imageWidth,
				h: imageHeight,
				mimeType: 'image/png',
				isAnimated: true,
				fileSize: 0,
			},
			meta: {},
		},
	])
	editor.createShape({
		id: id,
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