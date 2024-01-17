
import { Editor } from '@/Plate/components/plate-ui/editor'
import { Plate } from '@udecode/plate-common'
import { initialValue } from './PlateInitValue'
import { plugins, CustomPlugins } from './plugins'

const BasicEditor = () => {
    return (
        <Plate initialValue={initialValue} plugins={CustomPlugins}>
            <Editor spellCheck={false} autoFocus={false} placeholder="Type..." />
        </Plate>
    )
}

export default BasicEditor
