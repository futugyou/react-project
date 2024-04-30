import React from 'react';

import { DefaultQuickActions, DefaultQuickActionsContent } from "@tldraw/tldraw"

export const CustomQuickActions = () => {
    // @ts-ignore
    const content = <DefaultQuickActionsContent />
    return (
        <DefaultQuickActions>
            {content}
        </DefaultQuickActions>
    )
}
