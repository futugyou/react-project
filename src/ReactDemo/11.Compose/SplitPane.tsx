import './SplitPane.css'

const Contacts = () => {
    return <div className="Contacts" />;
}

const Chat = () => {
    return <div className="Chat" />;
}

const SplitPane = (props: any) => {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

const SplitPaneApp = () => {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}

export default SplitPaneApp