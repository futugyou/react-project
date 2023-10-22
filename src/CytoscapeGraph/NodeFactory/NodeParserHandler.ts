
import { DatabaseInstanceParse } from "@/CytoscapeGraph/NodeFactory/DatabaseInstance/DatabaseInstanceParse"
import { EC2InstanceParse } from "@/CytoscapeGraph/NodeFactory/EC2Instance/EC2InstanceParse"
import { fetchImage } from "@/CytoscapeGraph/NodeFactory/ImageSelector"

const nodeParsers = new Map()
const buildNodeParserFactory = () => {
    nodeParsers.set('AWS::EC2::Instance', EC2InstanceParse)
    nodeParsers.set('AWS::RDS::DBInstance', DatabaseInstanceParse)
}
buildNodeParserFactory()

export const parseNode = (properties: any, node: any) => {
    const parser = nodeParsers.get(properties.resourceType)
    if (parser) {
        return parser(node)
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
