import TemperatureInput from './TemperatureInput'
import BoilingVerdict from './BoilingVerdict'
import { useState } from 'react'

function toCelsius(fahrenheit: number) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature: string, convert: (arg0: number) => any) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props: any) {
    const [state, setState] = useState(
        {
            temperature: '',
            scale: 'c'
        })

    const handleCelsiusChange = (temperature: number) => {
        var newData = Object.assign({}, state, { scale: 'c', temperature: temperature });
        setState(newData);
    }

    const handleFahrenheitChange = (temperature: number) => {
        var newData = Object.assign({}, state, { scale: 'f', temperature: temperature });
        setState(newData);
    }

    const scale = state.scale;
    const temperature = state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div className="card">
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={handleCelsiusChange} />
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange} />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    )
}

export default Calculator