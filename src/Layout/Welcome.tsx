
import './Welcome.css'

import { Box, Button, Cards, Container, Link, SpaceBetween } from '@cloudscape-design/components'
import _ from 'lodash'

const Welcome = () => {
    const items = [
        {
            title: "company news",
            url: "/e/news",
            image: "/welcome/news.png",
            description: "",
        },
        {
            title: "economic indicators",
            url: "/e/economic",
            image: "/welcome/economic.png",
            description: "",
        },
        {
            title: "commodities",
            url: "/e/commodities",
            image: "/welcome/commodities.png",
            description: "",
        },
        {
            title: "stock series",
            url: "/e/stockSeries?symbol=IBM",
            image: "/welcome/stock.png",
            description: "",
        },
        {
            title: "fundamenta",
            url: "/e/balance",
            image: "/welcome/fundamenta.png",
            description: "",
        },
        {
            title: "excalidraw",
            url: "/w/excalidraw",
            image: "/welcome/excalidraw.png",
            description: "",
        },
        {
            title: "aws resource",
            url: "/flow/cytoscape",
            image: "/welcome/awsresource.png",
            description: "",
        },
        {
            title: ".net flow",
            url: "/flow/dotnet/di",
            image: "/welcome/netflow.png",
            description: "",
        },
        {
            title: "pdf reader",
            url: "/vue?vueawsapp=%2Fpdf",
            image: "/welcome/pdf.png",
            description: "",
        },
        {
            title: "translate",
            url: "/vue?vueawsapp=%2Ftranslate",
            image: "/welcome/translate.png",
            description: "",
        },
        {
            title: "bookshelf",
            url: "/bookshelf",
            image: "/welcome/bookshelf.png",
            description: "",
        },
    ]

    const welcomeitem = items.map((i, index) => {
        return (
            <div key={i.title} className='welcome-item'>
                <img
                    style={{ width: "100%" }}
                    src={i.image}
                    alt={i.title}
                />
                <div className="welcome-desc">
                    <Link href={i.url} external={true} fontSize="heading-xl">{i.title}</Link>
                </div>
            </div>
        )

    })
    return (
        <div className='welcome-container-bound'>
            <div className='welcome-container'>
                {welcomeitem}
            </div>
        </div>
    )
}

export default Welcome
