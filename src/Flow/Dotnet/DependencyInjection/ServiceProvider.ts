import { ClassNodeType } from '@/Flow/ClassNode'

export const ServiceProvider: ClassNodeType = {
    id: 'ServiceProvider',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
        name: 'ServiceProvider',
        properties: [
            'internal CallSiteFactory CallSiteFactory',
            'internal ServiceProviderEngineScope Root',

        ],
        methods: [
            'public object? GetService(Type serviceType)',
            'public object? GetKeyedService(Type serviceType, object? serviceKey)',
            'public object GetRequiredKeyedService(Type serviceType, object? serviceKey)',
            'public static T? GetService<T>(this IServiceProvider provider)',
            'public static IServiceScope CreateScope(this IServiceProvider provider)',
            'public static AsyncServiceScope CreateAsyncScope(this IServiceProvider provider)',
        ]
    }
}