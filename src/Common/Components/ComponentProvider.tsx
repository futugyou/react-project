
import React, { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from 'react'
import _ from 'lodash'

class ComponentProviderService {
    props: ComponentSetting
    constructor(props: ComponentSetting) {
        this.props = props
    }

    getSetting(): ComponentSetting {
        var setting = JSON.parse(window.localStorage.getItem('component-setting') || '{}') as ComponentSetting
        if (setting.select) {
            return setting
        }
        return this.props
    }

    setSetting(key: string, value: string) {
        var setting = JSON.parse(window.localStorage.getItem('component-setting') || '{}') as ComponentSetting
        _.set(setting, key, value)
        window.localStorage.setItem('component-setting', JSON.stringify(setting))
    }
}

interface ComponentProps {
    settingService: ComponentProviderService,
}

export const initialSetting: ComponentSetting = {
    select: "custom"
}

const ComponentContext = createContext<ComponentProps>({} as ComponentProps)

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

    return (
        <ComponentContext.Provider value={{ settingService: new ComponentProviderService(initialSetting) }}>
            {children}
        </ComponentContext.Provider>
    )
}

