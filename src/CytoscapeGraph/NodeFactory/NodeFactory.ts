
import * as R from 'ramda'

import { fetchImage, getAccountColour, getRegionColour } from "@/CytoscapeGraph/NodeFactory/ImageSelector"
import { parseNode } from "@/CytoscapeGraph/NodeFactory/NodeParserHandler"

export const buildBoundingBox = ({ id, type, label, properties }: any, parent?: string) => {
    try {
        const boundingBox = {
            group: "nodes",
            data: {
                id,
                parent: parent,
                title: label,
                label: label,
                plainLabel: label,
                type: type,
                borderStyle: 'solid',
                color: '#fff',
                borderColour: '#AAB7B8',
                opacity: '0',
                image: fetchImage(type) ?? fetchImage(properties.resourceType),
                clickedId: id,
                cost: Number(0),
                accountColour: getAccountColour(
                    type === 'account' ? label : 'global'
                ),
                regionColour: getRegionColour(
                    type === 'region' ? label : 'Multi-Region'
                ),
                aZColour: '#00A1C9',
                subnetColour: subnetColour({ data: { properties } }),
                properties: {},
                resource: {}
            },
            classes: [`${type}`, 'removeAll'],
        }

        if (['vpc', 'subnet'].includes(type)) {
            boundingBox.data.properties = properties
            boundingBox.data.resource = {
                id: properties.resourceId,
                name: properties.resourceName,
                // value: properties.resourceValue,
                type: properties.resourceType,
                tags: properties.tags,
                arn: properties.arn,
                region: properties.awsRegion ?? 'Multi-Region',
                state: properties.state,
                // loggedInURL: properties.loggedInURL,
                // loginURL: properties.loginURL,
                accountId: properties.accountId ?? 'global'
            }
        }
        return boundingBox
    } catch (e) {
        return {}
    }
}

const subnetColour = (node: any) => {
    if (node.data) {
        if (node.data.properties.private) {
            return '#147eba'
        }
        else return '#248814'
    }
    return '#545B64'
}


export const buildNode = (node: any, parent: any, clickedNode: any) => {
    try {
        const properties = node.data ? node.data.properties : node.properties
        const parsedNode = parseNode(properties, node)
        const builtNode = {
            group: "nodes",
            data: {
                arn: properties.arn,
                resourceId: properties.resourceId,
                parent: parent,
                id: node.id,
                title: properties.title,
                label: properties.title,
                shape: 'image',
                type: 'resource',
                accountColour: getAccountColour(
                    properties.accountId ? properties.accountId : 'global'
                ),
                regionColour: getRegionColour(
                    properties.awsRegion ? properties.awsRegion : 'Multi-Region'
                ),
                color: parsedNode.styling.colour,
                borderStyle: parsedNode.styling.borderStyle,
                borderColour: parsedNode.styling.borderColour,
                //   borderColour: state ? state.color : '#545B64',
                borderOpacity: parsedNode.styling.borderOpacity,
                //   borderOpacity: state ? '0.25' : '0',
                //   borderSize: state ? state.borderSize : 1,
                borderSize: parsedNode.styling.borderSize,
                opacity: '0',
                clickedId: node.id,
                ...({ state: parsedNode.state } ?? {}),
                image: parsedNode.icon,
                softDelete: properties.softDelete,
                // cost: Number(getCostData(node)),
                private: properties.private,
                ...({ detailsComponent: (parsedNode as any).detailsComponent } ?? {}),
                // ...({ hoverComponent: parsedNode.hoverComponent } ?? {}),
                resource: {
                    id: properties.resourceId,
                    name: properties.resourceName,
                    value: properties.resourceValue,
                    type: properties.resourceType,
                    tags: properties.tags,
                    arn: properties.arn,
                    region: properties.awsRegion ? properties.awsRegion : 'Multi-Region',
                    state: properties.state,
                    loggedInURL: properties.loggedInURL,
                    loginURL: properties.loginURL,
                    accountId: properties.accountId ? properties.accountId : 'global',
                },
                highlight: true,
                existing: false,
                properties: properties,
            },
            classes: [`resource`],
        }
        if (builtNode.data.type === 'resource') {
            builtNode.classes.push(...createClasses(builtNode, clickedNode))
        }
        return builtNode
    } catch (e) {
        console.error(e)
        return {}
    }
}

const findARN = (properties: any) => {
    return R.head(
        R.reduce(
            (acc: any, val: any) => {
                if (R.startsWith('arn:', val)) acc.push(val)
                return acc
            },
            [],
            R.filter((e: any) => !R.isNil(e), R.values(properties))
        )
    )
}

const buildResourceId = (properties: any) =>
    Array.of(
        properties.resourceId,
        !R.isNil(properties.arn) ? properties.arn : findARN(properties)
    )


const createClasses = (builtNode: any, clickedNode: any) => {
    return R.reject(R.isNil, [
        builtNode.data.highlight ? 'highlight' : undefined,
        builtNode.data.existing ? 'existing' : undefined,
        clickedNode ? 'clicked' : undefined,
        builtNode.data.resource && builtNode.data.resource.state
            ? builtNode.data.resource.state.className
            : undefined,
        'image',
        'selectable',
        'hoverover'
    ])
}
