import BaseRange from './BaseRange'

const Frequency = (props: any) => {
    const data = {
        popover: "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        display: "Frequency penalty",
        value: props.frequency_penalty ?? 0.0,
        min: 0.0,
        max: 2.0,
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
            onValueChange={props.onFrequencyPenaltyChange}>
        </BaseRange>
    )
}

export default Frequency
