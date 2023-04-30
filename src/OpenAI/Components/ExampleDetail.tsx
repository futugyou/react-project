import './ExampleDetail.css'

import { BsBinoculars } from "react-icons/bs";

function ExampleDetail(props: any) {

    let tags = []
    if (props.data.tags) {
        tags = props.data.tags.map((t: string) => {
            return (
                <div className="detail-tag-item">
                    {t}
                </div>
            )
        })
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
                <div className="detail-header-link">
                    <a target="_blank" href={"/playground/p/" + props.data.key + "?model=" + props.data.model}>
                        <span>
                            Open in Playground
                        </span>
                    </a>
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
                    <div className="detail-setting-header"></div>
                    <div className="detail-setting-details">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExampleDetail