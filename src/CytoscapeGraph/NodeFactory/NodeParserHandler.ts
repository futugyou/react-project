
import { parseEC2Instance } from "./EC2Instance/parseEC2Instance"
import { fetchImage } from "./ImageSelector"

export const parseNode = (properties: any, node: any) => {
    if (properties.resourceType == "AWS::EC2::Instance") {
        return parseEC2Instance(node)
    }
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
