import './CleanAllItem.css';
import React from 'react';

interface ICleanAllItemProps {
    show: boolean;
    onRemoveAllItem: () => void;
}

const CleanAllItem = ({ show, onRemoveAllItem }: ICleanAllItemProps) => {
    console.log("CleanAllItem")
    if (!show) {
        return null
    }

    return (
        <div className='close-all-container'>
            <div className='closs-indicatorContainer' onClick={() => onRemoveAllItem()} >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"></path>
                </svg>
            </div>
        </div>
    )
}

export default React.memo(CleanAllItem)
