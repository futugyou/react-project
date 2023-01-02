import { ChangeEvent } from 'react'

const scaleNames: { [key: string]: string } = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function TemperatureInput(props: any) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onTemperatureChange(event.target.value);
    }

    const temperature = props.temperature;
    const scale = props.scale;

    return (
        <div className="card">
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={(e) => handleChange(e)} />
            </fieldset>
        </div>
    )
}

export default TemperatureInput