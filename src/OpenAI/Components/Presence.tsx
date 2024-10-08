import BaseRange from './BaseRange'

const Presence = (props: any) => {
    const data = {
        popover: "How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics.",
        display: "Presence penalty",
        value: props.presence_penalty ?? 0.0,
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
            onValueChange={props.onPresencePenaltyChange}>
        </BaseRange>
    )
}

export default Presence
