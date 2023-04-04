import './StopInputContainer.css'
import StopInput from './StopInput';

function StopInputContainer(props: any) {
    const elements: any[] = [];
    props.stop.forEach((item: string) => {
        elements.push(
            <StopInput stopKey={item} onRemoveStop={(key: string) => props.HandleRemoveStop(key)}></StopInput>
        )
    });

    return (
        <div className='stop-sub-container'>
            <div className='stop-without-close' onClick={e => props.openTip()} >
                {elements}
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
            {props.stop.size > 0 && (
                <div className='close-all-container'>
                    <div className='closs-indicatorContainer' onClick={e => props.removeAllStop()} >
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"></path>
                        </svg>
                    </div>
                </div>)}
        </div>
    )
}

export default StopInputContainer