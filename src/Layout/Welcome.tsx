
import './Welcome.css'

import { useHref } from "react-router-dom"
import { Link } from '@cloudscape-design/components'

import { patchWindowOpen } from '@/MicroApp/event'

const Welcome = () => {
    const items = [
        {
            title: "company news",
            url: "/e/news",
            image: "./welcome/news.png",
            description: "",
        },
        {
            title: "economic indicators",
            url: "/e/economic",
            image: "./welcome/economic.png",
            description: "",
        },
        {
            title: "commodities",
            url: "/e/commodities",
            image: "./welcome/commodities.png",
            description: "",
        },
        {
            title: "stock series",
            url: "/e/stockSeries?symbol=IBM",
            image: "./welcome/stock.png",
            description: "",
        },
        {
            title: "fundamenta",
            url: "/e/balance",
            image: "./welcome/fundamenta.png",
            description: "",
        },
        {
            title: "excalidraw",
            url: "/w/excalidraw",
            image: "./welcome/excalidraw.png",
            description: "",
        },
        {
            title: "aws resource",
            url: "/flow/cytoscape",
            image: "./welcome/awsresource.png",
            description: "",
        },
        {
            title: ".net flow",
            url: "/flow/dotnet/di",
            image: "./welcome/netflow.png",
            description: "",
        },
        {
            title: "bookshelf",
            url: "/bookshelf",
            image: "./welcome/bookshelf.png",
            description: "",
        }
    ]

    const openExternalUrl = (url: string) => {
        patchWindowOpen(url)
    }

    const welcomeitem = items.map((i, index) => {
        const href = useHref(i.url)
        return (
            <div key={i.title} className='welcome-item'>
                <img
                    style={{ width: "100%" }}
                    src={i.image}
                    alt={i.title}
                />
                <div className="welcome-desc">
                    <Link onFollow={() => openExternalUrl(href)}
                        external={true} fontSize="heading-m">{i.title}</Link>
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
