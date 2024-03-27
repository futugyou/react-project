import './MiniModal.css'

import React, { ReactNode, useState } from 'react'
import { useAnimateKeyframes } from "react-simple-animate"

interface MiniModalProps {
    show: boolean
    setShow: (show: boolean) => void
    children: ReactNode
    size?: 'full' | 'large' | 'middle' | 'small' | 'auto'
}

const MiniModal = (props: MiniModalProps) => {
    const size = 'mini-modal-content modal-' + (props.size ?? 'middle')
    const { play, style, isPlaying } = useAnimateKeyframes({
        iterationCount: 2,
        direction: "alternate",
        duration: 0.2,
        keyframes: [
            "transform: scale(1, 1)",
            "transform: scale(1.01, 1.01)",
            "transform: scale(1, 1)",
        ]
    })

    const onModalWindowClick = () => {
        play(!isPlaying)
    }

    if (props.show) {
        return (
            <div className="mini-modal" onClick={() => onModalWindowClick()}>
                <div className={size} style={style} onClick={(e) => e.stopPropagation()}>
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