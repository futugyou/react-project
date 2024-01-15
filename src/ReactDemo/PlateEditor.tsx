import { Plate   } from '@udecode/plate-common'
import { Editor } from '@/plate-components/plate-ui/editor'

const BasicEditor = () => {
    return (
        <Plate>
            <Editor placeholder="Type..." />
        </Plate>
    )
}

export default BasicEditor
