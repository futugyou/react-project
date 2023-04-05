import './StopInputContainer.css';
import ExistedStop from './ExistedStop';

function StopInputContainer(props: any) {
    const existedStops: any[] = [];
    props.stop.forEach((item: string) => {
        existedStops.push(
            <ExistedStop key={item} itemKey={item} onRemoveStop={(key: string) => props.onRemoveStop(key)}></ExistedStop>
        )
    });

    return (
        <div className='stop-sub-container'>
            <div className='stop-without-close' onClick={e => props.onOpenTip()} >
                {existedStops}
                <div className="close-container">
                    <div className="d-i-block">
                        <input className='stop-input' autoCapitalize="none" autoComplete="off" autoCorrect="off" spellCheck="false" type="text" aria-autocomplete="list"
                            onChange={e => props.onStopChange(e.target.value)} value={props.state} onKeyDown={(e) => props.onStopAdded(e)} />
                        <div className='what-that'>
                            {props.state}
                        </div>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default StopInputContainer