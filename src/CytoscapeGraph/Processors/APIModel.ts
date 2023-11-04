export interface ConfigResourceData {
    nodes: Node[]
    edges: Edge[]
}

export interface Node {
    id: string
    label: string
    properties: ConfigProperties
}

export interface ConfigProperties {
    accountId: string
    arn: string
    availabilityZone: string
    awsRegion: string
    configuration: string
    configurationItemCaptureTime: string
    configurationItemStatus: string
    configurationStateId: string
    resourceCreationTime: string
    resourceId: string
    resourceName: string
    resourceType: string
    tags: string
    version: string
    vpcId: string
    subnetId: string
    subnetIds?: string[]
    title: string
    securityGroups?: string[]
    loginURL: string
    loggedInURL: string
}

export interface Edge {
    id: string
    label: string
    source: Source
    target: Target
}

export interface Source {
    id: string
    label: string
    resourceType: string
}

export interface Target {
    id: string
    label: string
    resourceType: string
}
