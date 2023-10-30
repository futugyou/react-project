

import { fetchImage } from "@/CytoscapeGraph/NodeFactory/ImageSelector"
import DatabaseInstanceParse from "./NodeParser/DatabaseInstance/Parse"
import EC2InstanceParse from "./NodeParser/EC2Instance/Parse"
import LoadBalancerParse from "./NodeParser/LoadBalancers/Parse"
import NetworkInterfaceParse from "./NodeParser/NetworkInterface/Parse"
import RouteTableParse from "./NodeParser/RouteTable/Parse"
import AWSManagedPolicyParse from "./NodeParser/AWSManagedPolicy/Parse"
import IamUserParse from "./NodeParser/IamUser/Parse"
import IamGroupParse from "./NodeParser/IamGroup/Parse"

const nodeParsers = new Map()
const buildNodeParserFactory = () => {
    nodeParsers.set('AWS::EC2::Instance', EC2InstanceParse)
    nodeParsers.set('AWS::RDS::DBInstance', DatabaseInstanceParse)
    nodeParsers.set('AWS::ElasticLoadBalancingV2::LoadBalancer', LoadBalancerParse)
    nodeParsers.set('AWS::EC2::NetworkInterface', NetworkInterfaceParse)
    nodeParsers.set('AWS::EC2::RouteTable', RouteTableParse)
    nodeParsers.set('AWS::IAM::AWSManagedPolicy', AWSManagedPolicyParse)
    nodeParsers.set('AWS::IAM::User', IamUserParse)
    nodeParsers.set('AWS::IAM::Group', IamGroupParse)
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
