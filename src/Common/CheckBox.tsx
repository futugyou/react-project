import './CheckBox.css'

import { useState } from "react"

export interface CheckBoxItem {
    key: string
    value: string
    choose?: boolean
}

interface CheckBoxProps {
    items: CheckBoxItem[]
    onCheckBoxChange?: (items: CheckBoxItem[]) => void;
    children?: React.ReactNode
}

const CheckBox = (props: CheckBoxProps) => {
    if (props.items.length < 1) {
        return (<></>)
    }

    const [checkItems, setCheckItems] = useState(props.items)

    const HandleChange = (v: string) => {
        let t = checkItems.map(t => {
            if (t.key.toLowerCase() === v.toLowerCase()) {
                t.choose = !t.choose
            }
            return t
        })

        setCheckItems(t)

        if (props.onCheckBoxChange) {
            t = t.filter(i => i.choose)
            props.onCheckBoxChange(t)
        }
    }

    const checkBoxitems = checkItems.map(i => {
        return (
            <div key={i.key} className="form-check">
                <input className="form-check-input" type="checkbox" value="" id={i.key} checked={i.choose ? true : false} onChange={() => HandleChange(i.key)} />
                <label className="form-check-label" htmlFor={i.key}>
                    {i.value}
                </label>
            </div>
        )
    })

    return (
        <>
            {checkBoxitems}
        </>
    )
}

export default CheckBox