import BaseRange from './BaseRange'

const Temperature = (props: any) => {
    const data = {
        popover: "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.",
        display: "Temperature",
        value: props.temperature ?? 0.0,
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
            onValueChange={(value: number) => props.onTemperatureChange(value)}>
        </BaseRange>
    )
}

export default Temperature
