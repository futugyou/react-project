import { ChangeEvent, FormEvent, useState } from 'react'
import BoilingVerdict from './BoilingVerdict'

function Calculator(props: any) {
    const [state, setState] = useState(
        {
            temperature: ''
        })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        var newData = Object.assign({}, state, { temperature: event.target.value });
        setState(newData);
    }

    return (
        <div className="card">
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input
                    value={state.temperature}
                    onChange={(e) => handleChange(e)} />
                <BoilingVerdict celsius={parseFloat(state.temperature)} />
            </fieldset>
        </div>
    )
}

export default Calculator