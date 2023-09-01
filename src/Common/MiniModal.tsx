import './MiniModal.css'

import React, { useState } from 'react'

const MiniModal = (props: any) => {
    if (props.show) {
        return (
            <div className="mini-modal">
                <div className='mini-modal-content' onClick={(e) => e.stopPropagation()}>
                    <div className='mini-modal-close' onClick={() => props.setShow(false)}>X</div>
                    <div className='mini-modal-body'>
                        {props.children}
                    </div>
                    {/* <div className='mini-modal-bottom'>
                        <button onClick={() => props.setShow(false)}>Close</button>
                    </div> */}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default MiniModal