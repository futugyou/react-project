
import * as R from 'ramda'
import { buildBoundingBox, buildNode } from "@/CytoscapeGraph/NodeFactory/NodeFactory"
import { ConfigProperties, ConfigResourceData, Node } from './APIModel'

const isBoundingBox = R.includes(R.__, ['account', 'region', 'availabilityZone', 'vpc', 'subnet', 'ecsCluster', 'cloudmap'])
const isRegional = R.includes(R.__, ['Not Applicable', 'Regional'])
const isSubnetOrVpc = R.includes(R.__, ['AWS_EC2_VPC', 'AWS_EC2_Subnet', 'AWS::EC2::VPC', 'AWS::EC2::Subnet'])
const isEcs = R.includes(R.__, ['AWS_ECS_Cluster', 'AWS::ECS::Cluster'])
const isCloudMap = R.includes(R.__, ['AWS_ServiceDiscovery_Namespace', 'AWS::ServiceDiscovery::Namespace'])

const createParent = ({ accountId, awsRegion, resourceId, availabilityZone, vpcId, subnetId, resourceType, configuration }: ConfigProperties, nodes: Node[]) => {
    if (resourceType == "AWS::ServiceDiscovery::Service") {
        const c = JSON.parse(configuration)
        return `${accountId}-${awsRegion}-${c.NamespaceId}`
    }
    if (resourceType == "AWS::ServiceDiscovery::Instance") {
        const sid = resourceId.split("|")[0]
        const service = nodes.find(p => p.properties.resourceId == sid)
        if (service) {
            const c = JSON.parse(service.properties.configuration)
            return `${accountId}-${awsRegion}-${c.NamespaceId}`
        }
    }
    if (resourceType == "AWS::ECS::Task") {
        const c = JSON.parse(configuration)
        if (vpcId && subnetId) {
            return c.ClusterArn + "-" + vpcId + "-" + subnetId
        }
        if (vpcId) {
            return c.ClusterArn + "-" + vpcId
        }
        return c.ClusterArn
    }
    if (resourceType == "AWS::ECS::Service") {
        const c = JSON.parse(configuration)
        if (vpcId && availabilityZone) {
            return c.Cluster + "-" + vpcId + "-" + availabilityZone
        }
        if (vpcId) {
            return c.Cluster + "-" + vpcId
        }
        return c.Cluster
    }
    if (subnetId != "") {
        return `arn:aws:ec2:${awsRegion}:${accountId}:subnet/${subnetId}`.replace(/:/g, '-')
    } else if (vpcId != "" && subnetId == "") {
        const vpcArn = `arn:aws:ec2:${awsRegion}:${accountId}:vpc/${vpcId}`.replace(/:/g, '-')
        if (!isRegional(availabilityZone)) {
            return `${vpcArn}-${availabilityZone}`
        }
        return vpcArn
    } else if (vpcId == "" && subnetId == "" && availabilityZone != "" && !isRegional(availabilityZone)) {
        return `${accountId}-${awsRegion}-${availabilityZone}`
    } else {
        return `${accountId}-${awsRegion}`
    }
}

export const processElements = ({ nodes, edges }: ConfigResourceData) => {
    // 1. account bounding
    const accountsBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { accountId } = properties
        if (!acc.has(accountId)) {
            acc.set(accountId, buildBoundingBox({
                id: accountId, type: 'account', label: accountId, properties
            }))
        }
        return acc
    }, new Map())

    // 2. region bounding
    const regionsBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { accountId, awsRegion } = properties
        const id = `${accountId}-${awsRegion}`
        if (!acc.has(id)) {
            acc.set(id, buildBoundingBox({
                id, type: 'region', label: awsRegion, properties
            }, accountId))
        }
        return acc
    }, new Map())

    // 3. availabilityZone bounding
    const availabilityZonesBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { accountId, awsRegion, availabilityZone, vpcId } = properties
        const id = `${accountId}-${awsRegion}-${availabilityZone}`
        const parent = `${accountId}-${awsRegion}`
        if (availabilityZone != "" && vpcId == "" && !isRegional(availabilityZone) && !acc.has(id)) {
            acc.set(id, buildBoundingBox({
                id, type: 'availabilityZone', label: availabilityZone, properties
            }, parent))
        }
        return acc
    }, new Map())

    // 4. vpc bounding
    const vpcBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { resourceType, vpcId, accountId, awsRegion, availabilityZone, arn, title } = properties

        if (resourceType === 'AWS::EC2::VPC' || vpcId != "") {
            const vpcArn = (resourceType === 'AWS::EC2::VPC' ? arn : `arn:aws:ec2:${awsRegion}:${accountId}:vpc/${vpcId}`)
            const vpcBbId = vpcArn.replace(/:/g, '-')
            const azId = `${vpcBbId}-${availabilityZone}`
            if (availabilityZone != "" && !isRegional(availabilityZone) && !acc.has(azId)) {
                acc.set(azId, buildBoundingBox({
                    id: azId, type: 'availabilityZone', label: availabilityZone, properties
                }, vpcBbId))
            }

            if (resourceType === 'AWS::EC2::VPC') {
                const parent = `${accountId}-${awsRegion}`
                if (!acc.has(vpcBbId)) {
                    acc.set(vpcBbId, buildBoundingBox({
                        id: vpcBbId, type: 'vpc', label: title, properties
                    }, parent))
                }
            }
        }

        return acc
    }, new Map())

    // 5. subnet bounding
    const subnetBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { resourceType, accountId, awsRegion, availabilityZone, vpcId, arn, title } = properties
        if (resourceType === 'AWS::EC2::Subnet') {

            const id = arn.replace(/:/g, '-')
            const parent = `arn:aws:ec2:${awsRegion}:${accountId}:vpc/${vpcId}`.replace(/:/g, '-')
            const azId = `${id}-${availabilityZone}`

            if (availabilityZone != "" && !['Not Applicable', 'Regional', 'Multiple Availability Zones'].includes(availabilityZone) && !acc.has(azId)) {
                acc.set(azId, buildBoundingBox({
                    id: azId, type: 'availabilityZone', label: availabilityZone, properties
                }, parent))
            }

            if (!acc.has(id)) {
                acc.set(id, buildBoundingBox({
                    id, type: 'subnet', label: title, properties
                }, azId))
            }
        }
        return acc
    }, new Map())

    // 6. cloudMap bounding
    const cloudMapBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { resourceType, accountId, awsRegion, vpcId, resourceId, title, } = properties
        if (resourceType === 'AWS::ServiceDiscovery::Namespace') {
            let parent = `cloudmap-${accountId}-${awsRegion}`
            if (vpcId) {
                parent = `cloudmap-arn:aws:ec2:${awsRegion}:${accountId}:vpc/${vpcId}`.replace(/:/g, '-')
            }
            const id = `${accountId}-${awsRegion}-${resourceId}`
            if (!acc.has(id)) {
                acc.set(id, buildBoundingBox({
                    id, type: 'cloudmap', label: title, properties
                }, parent))
            }

            // top cloudmap bound            
            let top = `${accountId}-${awsRegion}`
            if (vpcId) {
                top = `arn:aws:ec2:${awsRegion}:${accountId}:vpc/${vpcId}`.replace(/:/g, '-')
            }
            if (!acc.has(parent)) {
                acc.set(parent, buildBoundingBox({
                    id: parent, type: 'cloudmap', label: "cloud map", properties
                }, top))
            }
        }
        return acc
    }, new Map())

    // 7. ecs
    const ecsBoundingBoxes = nodes.reduce((acc, { properties }) => {
        const { resourceType, accountId, awsRegion, availabilityZone, arn, title, configuration, vpcId, subnetId } = properties
        if (resourceType === 'AWS::ECS::Cluster') {
            const id = arn
            const parent = `ECS-Cluster-${accountId}-${awsRegion}`

            if (!acc.has(id)) {
                acc.set(id, buildBoundingBox({
                    id, type: 'ecsCluster', label: title, properties
                }, parent))
            }

            // top ecs bound            
            const top = `${accountId}-${awsRegion}`
            if (!acc.has(parent)) {
                acc.set(parent, buildBoundingBox({
                    id: parent, type: 'ecsCluster', label: "ecs cluster", properties
                }, top))
            }
        }

        if (resourceType === 'AWS::ECS::Task') {
            const c = JSON.parse(configuration)
            const parent = c.ClusterArn
            const ecsvpc = c.ClusterArn + "-" + vpcId
            const ecssunbet = c.ClusterArn + "-" + vpcId + "-" + subnetId

            if (!acc.has(ecsvpc)) {
                const vpc = Array.from(vpcBoundingBoxes.values())
                    .find((p) => p.data?.properties?.resourceId == vpcId)
                if (vpc) {
                    acc.set(ecsvpc, buildBoundingBox({
                        id: ecsvpc, type: 'vpc', label: vpc.data.title, properties
                    }, parent))
                }
            }
            if (!acc.has(ecssunbet)) {
                const subnet = Array.from(subnetBoundingBoxes.values())
                    .find((p) => p.data?.properties?.resourceId == subnetId)
                if (subnet) {
                    acc.set(ecssunbet, buildBoundingBox({
                        id: ecssunbet, type: 'subnet', label: subnet.data.title, properties
                    }, ecsvpc))
                }
            }
        }

        if (resourceType === 'AWS::ECS::Service') {
            const c = JSON.parse(configuration)
            const parent = c.Cluster
            const ecsvpc = c.Cluster + "-" + vpcId
            const ecsavailabilityZone = c.Cluster + "-" + vpcId + "-" + availabilityZone

            if (!acc.has(ecsvpc)) {
                const vpc = Array.from(vpcBoundingBoxes.values())
                    .find((p) => p.data?.properties?.resourceId == vpcId)
                if (vpc) {
                    acc.set(ecsvpc, buildBoundingBox({
                        id: ecsvpc, type: 'vpc', label: vpc.data.title, properties
                    }, parent))
                }
            }
            if (!acc.has(ecsavailabilityZone)) {
                acc.set(ecsavailabilityZone, buildBoundingBox({
                    id: ecsavailabilityZone, type: 'availabilityZone', label: availabilityZone, properties
                }, ecsvpc))
            }
        }
        return acc
    }, new Map())

    const typeBoundingBoxes = new Map()
    const elements = nodes
        .filter((x) =>
            !isSubnetOrVpc(x.properties.resourceType) &&
            !isEcs(x.properties.resourceType) &&
            !isCloudMap(x.properties.resourceType))
        .map((resource) => {
            const { properties } = resource
            const [, , bbLabel] = properties.resourceType.split('::')

            const parent = createParent(properties, nodes)

            const bbId = `${bbLabel}-${parent}`

            if (!typeBoundingBoxes.has(bbId)) {
                typeBoundingBoxes.set(bbId, buildBoundingBox({
                    id: bbId, type: 'type', label: bbLabel, properties
                }, parent))
            }

            return buildNode(resource, bbId, false)
        })

    const allNodes = [
        ...Array.from(accountsBoundingBoxes.values()),
        ...Array.from(regionsBoundingBoxes.values()),
        ...Array.from(availabilityZonesBoundingBoxes.values()),
        ...Array.from(vpcBoundingBoxes.values()),
        ...Array.from(subnetBoundingBoxes.values()),
        ...Array.from(ecsBoundingBoxes.values()),
        ...Array.from(cloudMapBoundingBoxes.values()),
        ...Array.from(typeBoundingBoxes.values()),
        ...elements,
    ]

    return [
        ...removeEmptyBoundingBoxes(allNodes),
        ...edges
            .filter((x) => !(isSubnetOrVpc(x.target.resourceType) || isSubnetOrVpc(x.source.resourceType)))
            .filter((x) => !(isEcs(x.target.resourceType) || isEcs(x.source.resourceType)))
            .filter((x) => !(isCloudMap(x.target.resourceType) || isCloudMap(x.source.resourceType)))
            .map(({ id, source, target }) => {
                return { group: "edges", data: { id, source: source.id, target: target.id } } as cytoscape.ElementDefinition
            })
    ]
}


const removeEmptyBoundingBoxes = (nodes: cytoscape.ElementDefinition[]): cytoscape.ElementDefinition[] => {
    const typeMap = new Map(nodes.map(({ data: { id, type } }) => [id, type]))

    const adjList = nodes.reduce((acc, { data: { id } }) => {
        acc.set(id, new Set())
        return acc
    }, new Map())

    nodes.forEach(({ data: { id, parent } }) => {
        if (parent != "") {
            adjList.get(parent)?.add(id)
        }
    })

    const toDelete = new Set()
    for (const [id, edges] of adjList.entries()) {
        if (isBoundingBox(typeMap.get(id) as string) && edges.size === 0) {
            toDelete.add(id)
        }
    }

    toDelete.forEach(id => adjList.delete(id))

    return toDelete.size === 0 ? nodes : removeEmptyBoundingBoxes(nodes.filter((x) => adjList.has(x.data.id)))
}