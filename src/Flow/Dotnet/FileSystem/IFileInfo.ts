import { ClassNodeType } from '@/Flow/ClassNode'

export const IFileInfo: ClassNodeType = {
    id: 'IFileInfo',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
        name: 'IFileInfo',
        propertys:[
            'bool Exists { get; }',
            'long Length { get; }',
            'string? PhysicalPath { get; }',
            'string Name { get; }',
            'DateTimeOffset LastModified { get; }',
            'bool IsDirectory { get; }',
        ],
        methods: [
            'Stream CreateReadStream()',
        ]
    }
}