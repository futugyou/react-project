import React, { useCallback, useMemo } from 'react'
import ReactFlow, {
    NodeTypes, Edge, Node, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Panel
} from 'reactflow'

import 'reactflow/dist/style.css'
import { ClassNode } from '../ClassNode'

const initialNodes: Node[] = [
    {
        id: 'ServiceDescriptor', type: 'custom', position: { x: 0, y: 0 },
        data: {
            name: 'ServiceDescriptor',
            propertys: [
                'public ServiceLifetime Lifetime',
                'public Type ServiceType',
                'public Type? ImplementationType',
                'public Type? KeyedImplementationType',
                'public object? ImplementationInstance',
                'public Func<IServiceProvider, object>? ImplementationFactory'

            ],
            methods: [
                'public static ServiceDescriptor Transient<TService, TImplementation>()',
                'public static ServiceDescriptor KeyedTransient<TService, TImplementation>(object? serviceKey)',
                'public static ServiceDescriptor Scoped<TService, TImplementation>()',
                'public static ServiceDescriptor Singleton<TService, TImplementation>()',
                'public static ServiceDescriptor Describe(Type serviceType, Type implementationType, ServiceLifetime lifetime)',
            ]
        }
    },
    {
        id: 'IServiceCollection ', position: { x: 0, y: 300 }, type: 'custom',
        data: {
            name: 'IServiceCollection',
            parent: 'IList<ServiceDescriptor>',
            propertys: [
                'public int Count',
                'public ServiceDescriptor this[int index]',

            ],
            methods: [
                'void Add(ServiceDescriptor item)',
                'public static IServiceCollection AddTransient(this IServiceCollection services, Type serviceType, Type implementationType)',
                'public static IServiceCollection AddKeyedTransient(this IServiceCollection services, Type serviceType, object? serviceKey, Type implementationType)',
                'public static IServiceCollection AddScoped(this IServiceCollection services, Type serviceType, Func<IServiceProvider, object> implementationFactory)',
                'public static IServiceCollection AddSingleton<TService>(this IServiceCollection services, TService implementationInstance)',
                'public static ServiceProvider BuildServiceProvider(this IServiceCollection services)',                
            ]
        }
    },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: 'ServiceDescriptor', target: 'IServiceCollection' }]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
            >
                <Panel position="top-left">
                    <h2>Dependency Injection</h2>
                </Panel>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}