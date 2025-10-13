import './Tip.css'
import React from 'react'
import { FormField, Input, ColumnLayout } from '@cloudscape-design/components'

interface ITipProps {
    show: boolean
    tip: string
}

const Tip = ({ show = false, tip }: ITipProps) => {
    if (!show) {
        return null
    }

    return (
        <div className="disabled-input">
            <ColumnLayout columns={1} borders="vertical">
                <FormField label="">
                    <Input value={tip} disabled placeholder="Enter a sequence" />
                </FormField>
            </ColumnLayout>
        </div>
    )
}

export default React.memo(Tip)
