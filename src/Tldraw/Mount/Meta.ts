import { AssetRecordType, Editor } from "@tldraw/tldraw"

export const Meta = (editor: Editor) => {
    // There's no API for setting getInitialMetaForShape yet, but
    // you can replace it at runtime like this. This will run for
    // all shapes created by the user.
    editor.getInitialMetaForShape = (_shape) => {
        return {
            createdBy: editor.user.getId(),
            createdAt: Date.now(),
        }
    }

    // We can also use the sideEffects API to modify a shape before
    // its change is committed to the database. This will run for
    // all shapes whenever they are updated.
    editor.sideEffects.registerBeforeChangeHandler('shape', (_prev, next, source) => {
        if (source !== 'user') return next
        return {
            ...next,
            meta: {
                updatedBy: editor.user.getId(),
                updatedAt: Date.now(),
            },
        }
    })
}