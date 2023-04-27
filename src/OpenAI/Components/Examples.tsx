import './Examples.css'

function Examples(props: any) {
    return (
        <div className="example-page">
            <div className="example-container">
                <div className="example-header">
                    <h1 className="text-title">Examples</h1>
                    <h3 className="text-tagline">Explore what's possible with some example applications</h3>
                </div>
                <div className="example-search">
                    <div className="example-search-input-container">
                        <input className="example-search-input"></input>
                    </div>
                    <div className="example-search-categories-container">
                        <select className="example-search-categories"></select>
                    </div>
                </div>
                <div className="example-item-container">
                </div>
            </div>
        </div>
    )
}

export default Examples