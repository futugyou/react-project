import BaseRange from './BaseRange';

function TopP(props: any) {
    const data = {
        popover: "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        display: "Top P",
        value: props.top_p,
        min: 0.0,
        max: 1.0,
        step: 0.01,
    }

    return (
        <BaseRange
            popover={data.popover}
            display={data.display}
            value={data.value}
            min={data.min}
            max={data.max}
            step={data.step}
            onValueChange={(value: number) => props.onToppChange(value)}>
        </BaseRange>
    )
}

export default TopP
