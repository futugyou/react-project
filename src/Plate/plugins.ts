import { createPlateUI } from './component-util'

import {
    createBoldPlugin,
    createCodePlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import { createCodeBlockPlugin } from '@udecode/plate-code-block'
import { createPlugins } from '@udecode/plate-common'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createParagraphPlugin } from '@udecode/plate-paragraph'

export const plugins = createPlugins(
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
        components: createPlateUI(),
    }
)
