import './CheckBox.css'

export interface CheckBoxItem {
    key: string
    value: string
    choose?: boolean
}

interface CheckBoxProps {
    items: CheckBoxItem[]
    onCheckBoxChange?: (key: string) => void;
    children?: React.ReactNode
}

const CheckBox = (props: CheckBoxProps) => {
    if (props.items.length < 1) {
        return (<></>)
    }

    const HandleChange = (v: string) => {

    }

    const checkBoxitems = props.items.map(i => {
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