
import { Editor } from '@/Plate/components/plate-ui/editor'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { createPlugins, Plate, PlateContent } from '@udecode/plate-common'
import { useMemo, useState } from 'react'
import { initialValue } from './PlateInitValue'
import { plugins, CustomPlugins } from './plugins'
import { createDemoPlugin } from './Plugins/Demo'

const BasicEditor = () => {
    const [username, setNsername] = useState('')
    // const plugins = useMemo(
    //     () =>
    //         createPlugins([
    //             createDemoPlugin({
    //                 options: { username },
    //             }),
    //         ]),
    //     [username]
    // )

    return (
        <div style={{ textAlign: 'left' }}>
            <TooltipProvider>
                <Plate plugins={plugins} initialValue={initialValue}>
                    <PlateContent />
                </Plate>
            </TooltipProvider>
        </div>
    )
}

export default BasicEditor
