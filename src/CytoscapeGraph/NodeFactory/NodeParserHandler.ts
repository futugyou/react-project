

import { fetchImage } from "@/CytoscapeGraph/NodeFactory/ImageSelector"
import DatabaseInstanceParse from "./NodeParser/DatabaseInstance/Parse"
import EC2InstanceParse from "./NodeParser/EC2Instance/Parse"
import LoadBalancerParse from "./NodeParser/LoadBalancers/Parse"
import NetworkInterfaceParse from "./NodeParser/NetworkInterface/Parse"
import RouteTableParse from "./NodeParser/RouteTable/Parse"
import AWSManagedPolicyParse from "./NodeParser/AWSManagedPolicy/Parse"
import IamUserParse from "./NodeParser/IamUser/Parse"
import IamGroupParse from "./NodeParser/IamGroup/Parse"
import IamRoleParse from "./NodeParser/IamRole/Parse"
import IamPolicyParse from "./NodeParser/IamPolicy/Parse"
import KmsKeyParse from "./NodeParser/KmsKey/Parse"
import VpcPeerParse from "./NodeParser/VpcPeer/Parse"
import EventRuleParse from "./NodeParser/EventRule/Parse"
import FunctionParse from "./NodeParser/Function/Parse"
import DynamoDBParse from "./NodeParser/DynamoDB/Parse"
import NetworkAclParse from "./NodeParser/NetworkAcl/Parse"
import CertificateParse from "./NodeParser/Certificate/Parse"
import ECSServiceParse from "./NodeParser/ECSService/Parse"
import MQBrokerParse from "./NodeParser/MQBroker/Parse"

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
    nodeParsers.set('AWS::IAM::Role', IamRoleParse)
    nodeParsers.set('AWS::IAM::Policy', IamPolicyParse)
    nodeParsers.set('AWS::KMS::Key', KmsKeyParse)
    nodeParsers.set('AWS::EC2::VPCPeeringConnection', VpcPeerParse)
    nodeParsers.set('AWS::Events::Rule', EventRuleParse)
    nodeParsers.set('AWS::Lambda::Function', FunctionParse)
    nodeParsers.set('AWS::DynamoDB::Table', DynamoDBParse)
    nodeParsers.set('AWS::EC2::NetworkAcl', NetworkAclParse)
    nodeParsers.set('AWS::ACM::Certificate', CertificateParse)
    nodeParsers.set('AWS::ECS::Service', ECSServiceParse)
    nodeParsers.set('AWS::AmazonMQ::Broker', MQBrokerParse)
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
