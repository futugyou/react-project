import './MiniModal.css'

import React, { useState, useEffect } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'

const MiniModal = (props: any) => {
    if (!props.show) {
        return (<></>)
    }

    const [show, setShow] = useState(props.show)
    return (
        <>
            {
                show &&
                (
                    <div className="mini-modal">
                        <div className='mini-modal-content'>
                            <div className='mini-modal-body'>
                                {props.children}
                            </div>
                            <div className='mini-modal-bottom'>
                                <button onClick={() => setShow(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MiniModal