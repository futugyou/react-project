import { BaseBoxShapeUtil, HTMLContainer, RecordProps, T, TLShape } from 'tldraw'

const MY_EDITABLE_SHAPE_TYPE = 'editable-shape'

declare module 'tldraw' {
  export interface TLGlobalShapePropsMap {
    [MY_EDITABLE_SHAPE_TYPE]: {
      w: number
      h: number
      animal: number
    }
  }
}

const ANIMAL_EMOJIS = ['🐶', '🐱', '🐨', '🐮', '🐴']

export type IMyEditableShape = TLShape<typeof MY_EDITABLE_SHAPE_TYPE>

export class EditableShapeUtil extends BaseBoxShapeUtil<IMyEditableShape> {
  static override type = MY_EDITABLE_SHAPE_TYPE
  static override props: RecordProps<IMyEditableShape> = {
    w: T.number,
    h: T.number,
    animal: T.number,
  }

  override canEdit(shape: IMyEditableShape) {
    return true
  }

  override canEditWhileLocked(shape: IMyEditableShape) {
    return true
  }

  getDefaultProps(): IMyEditableShape['props'] {
    return {
      w: 200,
      h: 200,
      animal: 0,
    }
  }

  // [2]
  component(shape: IMyEditableShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id

    return (
      <HTMLContainer
        id={shape.id}
        onPointerDown={isEditing ? this.editor.markEventAsHandled : undefined}
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
          <p style={{ fontSize: 12 }}>Double Click to Edit</p>
        )}
      </HTMLContainer>
    )
  }

  getIndicatorPath(shape: IMyEditableShape) {
    const path = new Path2D()
    path.rect(0, 0, shape.props.w, shape.props.h)
    return path
  }

  override onEditEnd(shape: IMyEditableShape) {
    this.editor.animateShape(
      { ...shape, rotation: shape.rotation + Math.PI * 2 },
      { animation: { duration: 250 } },
    )
  }
}
