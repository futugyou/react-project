import './StopInputContainer.css';
import { useRef } from 'react';
import ExistedStop from './ExistedStop';

function StopInputContainer(props: any) {
    const inputRef = useRef<HTMLInputElement>(null);

    const existedStops: any[] = [];
    props.stop.forEach((item: string) => {
        existedStops.push(
            <ExistedStop key={item} itemKey={item} onRemoveStop={(key: string) => props.onRemoveStop(key)}></ExistedStop>
        )
    });

    const HandleInputContainerClick = () => {
        inputRef.current!.focus();
        if (props.onOpenTip) {
            props.onOpenTip()
        }
    }

    return (
        <div className='stop-sub-container'>
            <div className='stop-without-close' onClick={() => HandleInputContainerClick()} >
                {existedStops}
                <div className="close-container">
                    <div className="d-i-block">
                        <input className='stop-input' autoCapitalize="none" autoComplete="off" autoCorrect="off" spellCheck="false" type="text" aria-autocomplete="list"
                            ref={inputRef}
                            onChange={e => props.onStopChange(e.target.value)}
                            value={props.state}
                            onKeyDown={(e) => props.onStopAdded(e)}
                        />
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