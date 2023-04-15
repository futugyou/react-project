import BaseRange from './BaseRange';

function Bestof(props: any) {
    const data = {
        popover: "Generates multiple completions server-side, and displays only the best. Streaming only works when set to 1. Since it acts as a multiplier on the number of completions, this parameters can eat into your token quota very quickly – use caution!",
        display: "Best of",
        value: props.best_of ?? 1,
        min: 1,
        max: 20,
        step: 1,
    }

    return (
        <BaseRange
            popover={data.popover}
            display={data.display}
            value={data.value}
            min={data.min}
            max={data.max}
            step={data.step}
            onValueChange={(value: number) => props.onBestofChange(value)}>
        </BaseRange>
    )
}

export default Bestof
