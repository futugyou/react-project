import { ClassNodeType } from "../ClassNode";

export const ServiceCollection: ClassNodeType = {
    id: 'IServiceCollection',
    position: { x: 0, y: 0 },
    type: 'custom',
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
}