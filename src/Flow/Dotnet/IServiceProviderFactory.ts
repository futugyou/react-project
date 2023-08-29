import { ClassNodeType } from "../ClassNode"

export const IServiceProviderFactory: ClassNodeType = {
    id: 'IServiceProviderFactory',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
        name: 'IServiceProviderFactory<TContainerBuilder>',
        methods: [
            'TContainerBuilder CreateBuilder(IServiceCollection services)',
            'IServiceProvider CreateServiceProvider(TContainerBuilder containerBuilder)',
        ]
    }
}