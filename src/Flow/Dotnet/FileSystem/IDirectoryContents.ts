import { ClassNodeType } from '@/Flow/ClassNode'

export const IDirectoryContents: ClassNodeType = {
    id: 'IDirectoryContents',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
        name: 'IDirectoryContents',
        parent:'IEnumerable<IFileInfo>',
        propertys:[
            'bool Exists { get; }',
        ],
    }
}