
import CostomRender from './MiniReactHook/costomRender'

function App() {
    const writelog = () => {
        console.log("ok");
    };
    return (
        <div>
            <h1 onClick={writelog}>Hellow World</h1>
        </div>
    );
}
CostomRender.render(
    <App />,
    document.getElementById('root1'),
    null
)
