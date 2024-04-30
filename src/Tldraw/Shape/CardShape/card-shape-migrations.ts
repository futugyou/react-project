import { createShapePropsMigrationSequence, createShapePropsMigrationIds } from '@tldraw/tldraw'

const Versions = createShapePropsMigrationIds('card', {
    AddProperty: 1
})
// Migrations for the custom card shape (optional but very helpful)
export const cardShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: Versions.AddProperty,
            // [!!!] You no longer have access to the top-level shape object.
            // Only the shape.props object is passed in to the migrator function.
            up(props) {
                // [!!!] You no longer need to return a new copy of the shape object.
                // Instead, you can modify the props object in place.
                props.color = 'black'
            },
            // [!!!] You no longer need to specify a down migration.            
			down(props) {
				delete props.color
			},
        },
    ],
})
