import './InjectText.css'
import { useState } from 'react'

import { ColumnLayout, Popover, Box, Checkbox } from "@cloudscape-design/components"

interface IInjectTextProps {
    text: string
    checked: boolean
    label: string
    descript?: string
    onInjectChanged?: (text: string) => void
    onCheckChanged?: (checked: boolean) => void

}

const InjectText = ({ text = '', label = '', checked = false, descript, onInjectChanged, onCheckChanged }: IInjectTextProps) => {
    const [inject, setInject] = useState<string>(text)
    const [check, setCheck] = useState<boolean>(checked)
    const input_className = "inject-text-ta" + (check ? "" : " off")

    const injectDescriptPopover = (
        <Popover id="inject-popover">
            <Popover.Body>
                {descript}
            </Popover.Body>
        </Popover>
    )

    const handleInjectChanged = (value: string) => {
        setInject(value)
        if (onInjectChanged) {
            onInjectChanged(value)
        }
    }

    const handleCheckChanged = () => {
        let c: boolean = !check
        setCheck(c)
        if (onCheckChanged) {
            onCheckChanged(c)
        }
    }

    return (
        <>
            <Box className="mb-3" >
                <ColumnLayout columns={1} borders="vertical">
                    {descript && (
                        <Popover
                            dismissButton={false}
                            content={
                                <span> {descript}</span>
                            }
                            position="left"
                            triggerType="hover"
                            size="small"
                        >
                            <div>{label}</div>
                        </Popover>
                    )}
                    {!descript && (
                        <div>{label}</div>
                    )}
                </ColumnLayout>
                <ColumnLayout columns={1} borders="vertical" data-style="inject-text">
                    <Checkbox onChange={handleCheckChanged} checked={check} data-style="inject" />
                    <input className={input_className} type="text" value={inject} onChange={(e) => handleInjectChanged(e.target.value)}></input>
                </ColumnLayout>
            </Box>
        </>
    )
}

export default InjectText