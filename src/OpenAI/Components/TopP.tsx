import BaseRange from './BaseRange'

const TopP = (props: any) => {
    const data = {
        popover: "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        display: "Top P",
        value: props.top_p ?? 0.0,
        min: 0.0,
        max: 1.0,
        step: 0.01,
    }

    return (
        <BaseRange key={data.value}
            popover={data.popover}
            display={data.display}
            value={data.value}
            min={data.min}
            max={data.max}
            step={data.step}
            onValueChange={props.onToppChange}>
        </BaseRange>
    )
}

export default TopP
