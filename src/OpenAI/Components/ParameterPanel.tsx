
import { useNavigate } from "react-router-dom"
import SpaceBetween from "@cloudscape-design/components/space-between"

import ModeSelect from './ModeSelect'
import ModelSelect from './ModelSelect'
import Temperature from './Temperature'
import MaxTokens from './MaxTokens'
import Stop from './Stop'

import TopP from './TopP'
import Frequency from './Frequency'
import Presence from './Presence'
import Bestof from './Bestof'
import InjectText from './InjectText'

import { PlaygroundModel } from '../Models/PlaygroundModel'

const defaultPalygroundModelChange = (_data: PlaygroundModel) => { }

const ParameterPanel = (props: any) => {
    let playgroundModel: PlaygroundModel = props.data
    const mode: string = props.mode
    let setPlaygroundModel = props.onPlaygroundModelChange ?? defaultPalygroundModelChange

    const navigate = useNavigate()

    const HandleModeChange = (value: string) => {
        if (props.onModeChange) {
            props.onModeChange(value)
        }

        let path = location.pathname || "/"
        path += ("?mode=" + value.toLocaleLowerCase())

        let search = location.search || ""
        let p = new URLSearchParams(search)

        if (p.has("model")) {
            if (path.indexOf("?") > 0) {
                path += ("&model=" + p.get("model"))
            } else {
                path += ("?model=" + p.get("model"))
            }
        }

        navigate(path, { replace: true })
    }

    const handleModelChange = (value: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            model: value,
        })

        let path = location.pathname || "/"
        let search = location.search || ""
        let p = new URLSearchParams(search)

        if (p.has("mode")) {
            path += ("?mode=" + p.get("mode"))
        }

        if (path.indexOf("?") > 0) {
            path += ("&model=" + value)
        } else {
            path += ("?model=" + value)
        }

        navigate(path, { replace: true })
    }

    const handleTemperatureChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            temperature: +value
        })
    }

    const handleMaxTokensChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            responseLength: +value
        })
    }

    const handleStopChange = (value: string[]) => {
        setPlaygroundModel({
            ...playgroundModel,
            stopSequence: value
        })
    }

    const handleToppChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            top_p: +value
        })
    }

    const handleFrequencyPenaltyChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            frequency_penalty: +value
        })
    }

    const handlePresencePenaltyChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            presence_penalty: +value
        })
    }

    const handleBestofChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            best_of: +value
        })
    }

    const HandleInjectStartChanged = (injectText: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                startSequence: injectText,
            }
        )
    }

    const HandleCheckStartChanged = (checked: boolean) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                startSequenceEnabled: checked,
            }
        )
    }

    const HandleInjectRestartChanged = (injectText: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                restartSequence: injectText,
            }
        )
    }

    const HandleCheckRestartChanged = (checked: boolean) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                restartSequenceEnabled: checked,
            }
        )
    }

    return (
        <SpaceBetween size="s" >
            <ModeSelect mode={mode} onModeChange={HandleModeChange}></ModeSelect>

            <ModelSelect model={playgroundModel.model} onModelChange={handleModelChange} ></ModelSelect>

            <Temperature temperature={playgroundModel.temperature} onTemperatureChange={handleTemperatureChange} ></Temperature>

            {(mode != "Edit") && (<MaxTokens max_tokens={playgroundModel.responseLength} onMaxTokensChange={handleMaxTokensChange} ></MaxTokens>)}

            {(mode != "Chat" && mode != "Edit") && (<Stop stop={playgroundModel.stopSequence} onStopChange={handleStopChange} ></Stop>)}

            <TopP top_p={playgroundModel.top_p} onToppChange={handleToppChange} ></TopP>

            {(mode != "Edit") && (<Frequency frequency_penalty={playgroundModel.frequency_penalty} onFrequencyPenaltyChange={handleFrequencyPenaltyChange} ></Frequency>)}

            {(mode != "Edit") && (<Presence presence_penalty={playgroundModel.presence_penalty} onPresencePenaltyChange={handlePresencePenaltyChange} ></Presence>)}

            {(mode != "Chat" && mode != "Edit") && (<Bestof best_of={playgroundModel.best_of} onBestofChange={handleBestofChange} ></Bestof>)}

            {(mode != "Chat" && mode != "Insert" && mode != "Edit") && (<InjectText
                text={playgroundModel.startSequence}
                checked={playgroundModel.startSequenceEnabled}
                label="Inject start text"
                descript="Text to append after the user's input to format the model for a response."
                onInjectChanged={HandleInjectStartChanged}
                onCheckChanged={HandleCheckStartChanged}
            ></InjectText>)}

            {(mode != "Chat" && mode != "Insert" && mode != "Edit") && (<InjectText
                text={playgroundModel.restartSequence}
                checked={playgroundModel.restartSequenceEnabled}
                label="Inject restart text"
                descript="Text to append after the model's generation to continue the patterned structure."
                onInjectChanged={HandleInjectRestartChanged}
                onCheckChanged={HandleCheckRestartChanged}
            ></InjectText>)}
        </SpaceBetween>
    )
}

export default ParameterPanel