import {
    AssetRecordType, Editor, MediaHelpers, isGifAnimated,
    uniqueId, TLAssetId, getHashForString, TLAsset
} from "@tldraw/tldraw"

const configserver = import.meta.env.REACT_APP_FLOW_SERVER

const configPath = 'v1/upload'

export const HostedImages = (editor: Editor) => {
    editor.registerExternalAssetHandler('file', async ({ file }: { type: 'file'; file: File }) => {
        const id = uniqueId()

        const objectName = `${id}-${file.name}`.replaceAll(/[^a-zA-Z0-9.]/g, '-')
        const url = `${configserver + configPath}/${objectName}`

        await fetch(url, {
            method: 'POST',
            body: file,
        })
        //[b]
        const assetId: TLAssetId = AssetRecordType.createId(getHashForString(url))

        let size: {
            w: number
            h: number
        }
        let isAnimated: boolean
        let shapeType: 'image' | 'video'

        //[c]
        if (['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
            shapeType = 'image'
            size = await MediaHelpers.getImageSize(file)
            isAnimated = file.type === 'image/gif' && (await isGifAnimated(file))
        } else {
            shapeType = 'video'
            isAnimated = true
            size = await MediaHelpers.getVideoSize(file)
        }
        //[d]
        const asset: TLAsset = AssetRecordType.create({
            id: assetId,
            type: shapeType,
            typeName: 'asset',
            props: {
                name: file.name,
                src: url,
                w: size.w,
                h: size.h,
                mimeType: file.type,
                isAnimated,
            },
        })

        return asset
    })
}
