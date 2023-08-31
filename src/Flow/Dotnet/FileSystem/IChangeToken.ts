import { ClassNodeType } from '@/Flow/ClassNode'

export const IChangeToken: ClassNodeType = {
    id: 'IChangeToken',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
        name: 'IChangeToken',
        properties:[
            'bool HasChanged { get; }',
            'bool ActiveChangeCallbacks { get; }',
        ],
        methods: [
            'IDisposable RegisterChangeCallback(Action<object?> callback, object? state)',
        ],
    }
}