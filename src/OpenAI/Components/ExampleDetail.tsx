import './ExampleDetail.css'

import { useState } from "react"
import { BsBinoculars } from "react-icons/bs"

import { Link } from '@cloudscape-design/components'
import { useHref } from "react-router-dom"
import { patchWindowOpen } from '@/MicroApp/event'
import { useAuth } from '@/Auth/index'

const ExampleDetail = (props: any) => {
    const { authService } = useAuth()
    let tags = []
    if (props.data.tags) {
        tags = props.data.tags.map((t: string) => {
            return (
                <div key={t} className="detail-tag-item">
                    {t}
                </div>
            )
        })
    }

    const href = useHref("/openai/playground/p/" + props.data.key + "?model=" + props.data.model)
    const [exampleData, setExampleData] = useState(props.data)

    const onEidtClick = () => {
        if (props.onEidtClick) {
            props.onEidtClick()
        }
        return false
    }

    const openExternalUrl = () => {
        patchWindowOpen(href)
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <div className="detail-header-icon">
                    <BsBinoculars></BsBinoculars>
                </div>
                <div className="detail-header-title-group">
                    <div className="detail-header-title">{props.data.title}</div>
                    <div className="detail-header-tags">{tags}</div>
                </div>
                {
                    authService.isAuthenticated() &&
                    (
                        <div className="detail-header-link">
                            <Link onFollow={onEidtClick} >
                                Edit
                            </Link>
                        </div>
                    )
                }
                <div className="detail-header-link">
                    <Link onFollow={openExternalUrl} external={true}>
                        Open in Playground
                    </Link>
                </div>
            </div>
            <div className="detail-body">
                <div className="detail-body-left">
                    <div className="detail-description">{props.data.description}</div>
                    <div className="detail-prompt">
                        <div className="detail-prompt-header">
                            Prompt
                        </div>
                        <div className="detail-prompt-content">
                            {props.data.prompt}
                        </div>
                    </div>
                    <div className="detail-response">
                        <div className="detail-response-header">
                            Sample response
                        </div>
                        <div className="detail-response-content">
                            {props.data.sample_response}
                        </div>
                    </div>
                </div>
                <div className="detail-body-right">
                    <div className="detail-setting-header">Settings</div>
                    <div className="detail-setting-details">
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Engine</div>
                            <div className="detail-setting-text">{props.data.model}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Max tokens</div>
                            <div className="detail-setting-text">{props.data.max_tokens}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Temperature</div>
                            <div className="detail-setting-text">{props.data.temperature}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Top p</div>
                            <div className="detail-setting-text">{props.data.top_p}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Frequency penalty</div>
                            <div className="detail-setting-text">{props.data.frequency_penalty}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Presence penalty</div>
                            <div className="detail-setting-text">{props.data.presence_penalty}</div>
                        </div>
                        <div className="detail-setting-container">
                            <div className="detail-setting-label">Stop sequence</div>
                            <div className="detail-setting-text">{props.data.stop}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExampleDetail