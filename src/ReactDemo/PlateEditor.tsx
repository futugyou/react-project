
import { initialValue } from './PlateInitValue'

import {
    createBoldPlugin,
    createCodePlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import { createBlockquotePlugin } from '@udecode/plate-block-quote' 
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { createPlugins, Plate } from '@udecode/plate-common'
import {
    createCodeBlockPlugin, ELEMENT_CODE_BLOCK,
    ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX
} from '@udecode/plate-code-block'

import { Editor } from '@/components/plate-ui/editor'
import { CodeBlockElement } from '@/components/plate-ui/code-block-element'
import { CodeLineElement } from '@/components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf'

const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createHeadingPlugin(),

        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
    ],
    {
        components: {
            [ELEMENT_CODE_BLOCK]: CodeBlockElement,
            [ELEMENT_CODE_LINE]: CodeLineElement,
            [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        },
    }
)

const BasicEditor = () => {

    return (
        <Plate initialValue={initialValue} plugins={plugins}>
            <Editor spellCheck={false} autoFocus={false} placeholder="Type..." />
        </Plate>
    )
}

export default BasicEditor
