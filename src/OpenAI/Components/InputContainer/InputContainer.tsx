import './InputContainer.css';
import { KeyboardEvent, useRef } from 'react';
import ExistedItem from './ExistedItem';

function InputContainer(props: any) {
    const inputRef = useRef<HTMLInputElement>(null);

    const existedItems: any[] = [];
    props.stop.forEach((item: string) => {
        existedItems.push(
            <ExistedItem key={item} itemKey={item} onRemoveItem={(key: string) => props.onRemoveItem(key)}></ExistedItem>
        )
    });

    const HandleInputContainerClick = () => {
        inputRef.current!.focus();
        if (props.onInputContainerClick) {
            props.onInputContainerClick()
        }
        inputRef.current!.style.width = "2px";
    }

    const HandleInputChange = (text: string) => {
        inputRef.current!.focus();
        inputRef.current!.style.width = (text.length + 1) * 8 + "px";
        if (props.onItemChange) {
            props.onItemChange(text)
        }
    }

    const HandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            inputRef.current!.style.width = "2px";
        }
        if (props.onKeyDown) {
            props.onKeyDown(e)
        }
    }

    return (
        <div className='input-container-all'>
            <div className='input-container-without-closeall' onClick={() => HandleInputContainerClick()} >
                {existedItems}
                <div className="input-container">
                    <input className='input-item' autoCapitalize="none" autoComplete="off" autoCorrect="off" spellCheck="false" type="text" aria-autocomplete="list"
                        ref={inputRef}
                        value={props.state}
                        onChange={e => HandleInputChange(e.target.value)}
                        onKeyDown={(e) => HandleKeyDown(e)}
                    />
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default InputContainer