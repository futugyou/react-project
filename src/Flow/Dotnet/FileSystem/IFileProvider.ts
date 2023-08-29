import { ClassNodeType } from '@/Flow/ClassNode'

export const IFileProvider: ClassNodeType = {
    id: 'IFileProvider',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
        name: 'IFileProvider',
        methods: [
            'IFileInfo GetFileInfo(string subpath)',
            'IDirectoryContents GetDirectoryContents(string subpath)',
            'IChangeToken Watch(string filter)',
        ]
    }
}