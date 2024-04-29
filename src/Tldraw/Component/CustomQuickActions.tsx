import { DefaultQuickActions, DefaultQuickActionsContent } from "@tldraw/tldraw"

export const CustomQuickActions = () => {
    var Content = DefaultQuickActionsContent as any
    return (
        <DefaultQuickActions>
            <Content />
        </DefaultQuickActions>
    )
}
