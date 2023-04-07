import './InputContainer.css';
import { useRef } from 'react';
import ExistedStop from './ExistedItem';

function InputContainer(props: any) {
    const inputRef = useRef<HTMLInputElement>(null);

    const existedStops: any[] = [];
    props.stop.forEach((item: string) => {
        existedStops.push(
            <ExistedStop key={item} itemKey={item} onRemoveItem={(key: string) => props.onRemoveStop(key)}></ExistedStop>
        )
    });

    const HandleInputContainerClick = () => {
        inputRef.current!.focus();
        if (props.onOpenTip) {
            props.onOpenTip()
        }
    }

    return (
        <div className='input-container-all'>
            <div className='input-container-without-closeall' onClick={() => HandleInputContainerClick()} >
                {existedStops}
                <div className="input-container">
                    <input className='input-item' autoCapitalize="none" autoComplete="off" autoCorrect="off" spellCheck="false" type="text" aria-autocomplete="list"
                        ref={inputRef}
                        onChange={e => props.onStopChange(e.target.value)}
                        value={props.state}
                        onKeyDown={(e) => props.onStopAdded(e)}
                    />
                    <div className='input-display-layer'>
                        {props.state}
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default InputContainer