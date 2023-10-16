import { fetchImage } from "./ImageSelector"

export const parseNode = (properties: any, node: any) => {
    return {
        styling: {
            borderStyle: 'solid',
            borderColour: '#545B64',
            borderOpacity: 0.25,
            borderSize: 1,
            message: '',
            colour: '#fff'
        },
        icon: fetchImage(properties.resourceType)
    }
}