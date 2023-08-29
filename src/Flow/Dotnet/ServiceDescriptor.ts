import { ClassNodeType } from "../ClassNode"

export const ServiceDescriptor: ClassNodeType = {
    id: 'ServiceDescriptor',
    type: 'custom',
    position: { x: 0, y: 0 },
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
}