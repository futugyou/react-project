declare module 'cytoscape-cose-bilkent' {
    import cytoscape from "cytoscape"
    const cytoscapeCoseBilkent: cytoscape.Ext

    export = cytoscapeCoseBilkent

    namespace cytoscapeCoseBilkent {
        interface FcoseLayoutOptions extends cytoscape.BaseLayoutOptions {
            /* layout event callbacks */
            ready?: cytoscape.LayoutHandler | undefined
            stop?: cytoscape.LayoutHandler | undefined
            // 'draft', 'default' or 'proof'
            // - "draft" only applies spectral layout
            // - "default" improves the quality with incremental layout (fast cooling rate)
            // - "proof" improves the quality with incremental layout (slow cooling rate)
            quality?: "default" | "draft" | "proof"
            // Whether to include labels in node dimensions. Valid in "proof" quality
            nodeDimensionsIncludeLabels?: boolean
            // number of ticks per frame higher is faster but more jerky
            refresh?: number
            // Fit the viewport to the repositioned nodes
            fit?: boolean
            // Padding around layout
            padding?: number
            // Whether to enable incremental mode
            randomize?: boolean
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion?: ((node: any) => number) | number
            // Ideal edge (non nested) length
            idealEdgeLength?: ((edge: any) => number) | number
            // Divisor to compute edge forces
            edgeElasticity?: ((edge: any) => number) | number
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor?: number
            // Gravity force (constant)
            gravity?: number
            // Maximum number of iterations to perform - this is a suggested value and might be adjusted by the algorithm as required
            numIter?: number
            // For enabling tiling
            tile?: boolean
            // Whether or not to animate the layout
            animate?: boolean | 'during' | 'end'
            // Duration of animation in ms, if enabled
            animationDuration?: number
            // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingVertical?: number
            // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingHorizontal?: number
            // Gravity range (constant) for compounds
            gravityRangeCompound?: number
            // Gravity force (constant) for compounds
            gravityCompound?: number
            // Gravity range (constant)
            gravityRange?: number
            // Initial cooling factor for incremental layout
            initialEnergyOnIncremental?: number
            name: "cose-bilkent"
        }
    }
}