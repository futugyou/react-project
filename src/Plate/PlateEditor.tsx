
import { Editor } from '@/Plate/components/plate-ui/editor'
import { Plate } from '@udecode/plate-common'
import { initialValue } from './PlateInitValue'
import { plugins } from './plugins'

const BasicEditor = () => {
    return (
        <Plate initialValue={initialValue} plugins={plugins}>
            <Editor spellCheck={false} autoFocus={false} placeholder="Type..." />
        </Plate>
    )
}

export default BasicEditor
