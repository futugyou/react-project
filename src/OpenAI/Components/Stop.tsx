import './Stop.css'
import { KeyboardEvent, useState, useCallback } from 'react'

import { Popover, Box } from "@cloudscape-design/components"

import StopDescribe from './InputContainer/Describe'
import StopInputContainer from './InputContainer/InputContainer'
import StopTip from './InputContainer/Tip'
import CleanAllStop from './InputContainer/CleanAllItem'

const Stop = (props: any) => {
    let stops = new Set<string>(props.stop)
    const [stop, setStop] = useState<Set<string>>(stops)
    const [state, setState] = useState('')
    const [show, setShow] = useState(false)

    let tip = state.length > 0 ? ("Add \"" + state + "\"") : ""

    let display = "Stop sequences"
    let subDisplay = "Enter sequence and press Tab"
    let popover = "Up to four sequences where the API will stop generating further tokens.The returned text will not contain the stop sequence."



    const HandleOpenTip = () => {
        setShow(!show)
        setState('')
    }

    const HandleRemoveStop = (value: string) => {
        let s = stop
        s.delete(value)
        setStop(s)
        props.onStopChange(Array.from(s.values()))
    }

    const HandleRemoveAllStop = useCallback(() => {
        let s = new Set<string>()
        setStop(s)
        props.onStopChange(Array.from(s.values()))
        setState('')
    }, [stop, state])

    const HandleStopChange = (value: string) => {
        setState(value)
        setShow(true)
    }

    const HandleStopAdded = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && state != '') {
            let s = stop
            s.add(state)
            setStop(s)
            // setTip('')
            setState('')
            props.onStopChange(Array.from(s.values()))
        }
    }

    return (
        <>
            <Popover
                dismissButton={false}
                content={
                    < >{popover}</ >
                }
                position="left"                
                size="small"
            >
                <Box className="mb-3 stop-container" >
                    <StopDescribe display={display} subDisplay={subDisplay} ></StopDescribe>
                    <StopInputContainer stop={stop} state={state}
                        onRemoveItem={HandleRemoveStop}
                        onInputContainerClick={HandleOpenTip}
                        onItemChange={HandleStopChange}
                        onKeyDown={HandleStopAdded} >
                        <CleanAllStop show={stop.size > 0} onRemoveAllItem={HandleRemoveAllStop}></CleanAllStop>
                    </StopInputContainer>

                    <StopTip show={show} tip={tip}></StopTip>
                </Box>
            </Popover>
        </>
    )
}
export default Stop

