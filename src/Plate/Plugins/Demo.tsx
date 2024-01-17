import { createPluginFactory, getPluginOptions } from "@udecode/plate-common"

export interface DemoPlugin {
    username?: string
}

export const KEY_DEMO = 'demo'

export const createDemoPlugin = createPluginFactory<DemoPlugin>({
    key: KEY_DEMO,
    handlers: {
        onKeyDown: (editor) => (event) => {
            const { username } = getPluginOptions<DemoPlugin>(editor, KEY_DEMO)
            console.info(`${username} pressed ${event.key}`)
        },
    },
    then: (_editor, { options }) => ({
        renderAboveEditable: ({ children }) => (
            <div>
                <p>Editing as {options.username}</p>
                {children}
            </div>
        ),
    }),
    options: {
        // Optionally specify a default value
        username: 'Anonymous',
    },
})
