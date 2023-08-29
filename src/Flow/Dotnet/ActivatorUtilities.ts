import { ClassNodeType } from "../ClassNode"

export const ActivatorUtilities: ClassNodeType = {
    id: 'ActivatorUtilities',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
        name: 'ActivatorUtilities',
        methods: [
            'public static ObjectFactory CreateFactory(Type instanceType, Type[] argumentTypes)',
            'public static ObjectFactory<T> CreateFactory<T>(Type[] argumentTypes)',
            'public static object CreateInstance(IServiceProvider provider, Type instanceType, params object[] parameters)',
            'public static T CreateInstance<T>(IServiceProvider provider, params object[] parameters)',
            'public static object GetServiceOrCreateInstance(IServiceProvider provider, Type type)',
            'public static T GetServiceOrCreateInstance<T>(IServiceProvider provider)',
        ]
    }
}