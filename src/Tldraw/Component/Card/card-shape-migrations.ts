import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

const versions = createShapePropsMigrationIds(
    'card',
    {
        AddSomeProperty: 1,
    }
)

export const cardShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: versions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        },
    ],
})