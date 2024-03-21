import React, { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from 'react'

interface ComponentProps {
    setting: ComponentSetting,
    setSetting: React.Dispatch<React.SetStateAction<ComponentSetting>>,
}

export const initialSetting: ComponentSetting = {
    select: "custom"
}

const ComponentContext = createContext<ComponentProps>({
    setting: initialSetting,
    setSetting: () => { },
})

export const useComponent = (): ComponentProps => {
    const context = useContext(ComponentContext)
    if (context === undefined) {
        throw new Error('useComponent must be used within a ComponentProvider')
    }
    return context
}

interface ComponentSetting {
    select: string
}

interface ComponentProviderProps {
    children: ReactNode
}

export const ComponentProvider = (props: ComponentProviderProps): ReactElement => {
    const { children } = props
    const [setting, setSetting] = useState(initialSetting)
    const contextValue = useMemo(() => {
        return { setting, setSetting }
    }, [setting, setSetting])

    return (
        <ComponentContext.Provider value={contextValue}>
            {children}
        </ComponentContext.Provider>
    )
}
