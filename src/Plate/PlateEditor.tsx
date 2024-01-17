
import { Editor } from '@/Plate/components/plate-ui/editor'
import { createPlugins, Plate } from '@udecode/plate-common'
import { useMemo, useState } from 'react'
import { initialValue } from './PlateInitValue'
import { plugins, CustomPlugins } from './plugins'
import { createDemoPlugin } from './Plugins/Demo'

const BasicEditor = () => {
    const [username, setNsername] = useState('')
    const plugins = useMemo(
        () =>
            createPlugins([
                createDemoPlugin({
                    options: { username },
                }),
            ]),
        [username]
    )

    return (
        <Plate initialValue={initialValue} plugins={plugins}>
            <Editor spellCheck={false} autoFocus={false} placeholder="Type..." />
        </Plate>
    )
}

export default BasicEditor
