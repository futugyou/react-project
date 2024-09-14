import {
    BaseBoxShapeUtil,
    HTMLContainer,
    RecordProps,
    T,
    TLBaseShape,
    stopEventPropagation,
} from '@tldraw/tldraw'

const ANIMAL_EMOJIS = ['🐶', '🐱', '🐨', '🐮', '🐴']

type IMyEditableShape = TLBaseShape<
    'editable-shape',
    {
        w: number
        h: number
        animal: number
    }
>

export class EditableShapeUtil extends BaseBoxShapeUtil<IMyEditableShape> {
    static override type = 'editable-shape' as const
    static override props: RecordProps<IMyEditableShape> = {
        w: T.number,
        h: T.number,
        animal: T.number,
    }

    // [1] !!!
    override canEdit = () => true

    getDefaultProps(): IMyEditableShape['props'] {
        return {
            w: 200,
            h: 200,
            animal: 0,
        }
    }


    component(shape: IMyEditableShape) {

        const isEditing = this.editor.getEditingShapeId() === shape.id

        return (
            <HTMLContainer
                id={shape.id}
                onPointerDown={isEditing ? stopEventPropagation : undefined}
                style={{
                    pointerEvents: isEditing ? 'all' : 'none',
                    backgroundColor: '#efefef',
                    fontSize: 24,
                    padding: 16,
                }}
            >
                {ANIMAL_EMOJIS[shape.props.animal]}
                {isEditing ? (
                    <button
                        onClick={() => {
                            this.editor.updateShape({
                                id: shape.id,
                                type: shape.type,
                                props: {
                                    ...shape.props,
                                    animal: (shape.props.animal + 1) % ANIMAL_EMOJIS.length,
                                },
                            })
                        }}
                    >
                        Next
                    </button>
                ) : (
                    // [d] when not editing...
                    <p style={{ fontSize: 12 }}>Double Click to Edit</p>
                )}
            </HTMLContainer>
        )
    }

    indicator(shape: IMyEditableShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }

    override onEditEnd(shape: IMyEditableShape) {
		this.editor.animateShape(
			{ ...shape, rotation: shape.rotation + Math.PI * 2 },
			{ animation: { duration: 250 } }
		)
	}
}
