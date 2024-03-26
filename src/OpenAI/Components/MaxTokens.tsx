import BaseRange from './BaseRange'

const MaxTokens = (props: any) => {
    const data = {
        popover: "The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens shared between prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for normal English text)",
        display: "Maximum length",
        value: props.max_tokens ?? 1,
        min: 1,
        max: 4000,
        step: 1,
    }

    return (
        <BaseRange key={data.value}
            popover={data.popover}
            display={data.display}
            value={data.value}
            min={data.min}
            max={data.max}
            step={data.step}
            onValueChange={props.onMaxTokensChange}>
        </BaseRange>
    )
}

export default MaxTokens
