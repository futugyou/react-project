import './Pusher.css'

import { useEffect, useRef } from 'react'
import Pusher from 'pusher-js'

const PusherComponent = () => {
    const whiteboardRef = useRef<HTMLCanvasElement>(null)

    var pusher = new Pusher(import.meta.env.REACT_APP_PUSHER_KEY, {
        cluster: import.meta.env.REACT_APP_PUSHER_CLUSTER
    })

    const onDrawingEvent = ({ x0, x1, y0, y1, color }: any) => {
        if (!whiteboardRef.current) {
            return
        }

        let w = whiteboardRef.current.width
        let h = whiteboardRef.current.height
        drawLine(x0 * w, x1 * w, y0 * h, y1 * h, color, false)
    }

    var channel = pusher.subscribe('my-channel')
    channel.bind('my-event', onDrawingEvent)

    let current = {
        color: 'black',
        x: 0,
        y: 0,
    }

    let drawing = false

    const drawLine = (x0: any, x1: any, y0: any, y1: any, color: any, emit: any) => {
        if (!whiteboardRef.current) {
            return
        }
        const context = whiteboardRef.current.getContext('2d')
        if (!context) {
            return
        }

        context.beginPath()
        context.moveTo(x0, y0)
        context.lineTo(x1, y1)
        context.strokeStyle = color
        context.lineWidth = 2
        context.closePath()
        context.stroke()

        if (!emit) {
            return
        }

        let w = whiteboardRef.current.width
        let h = whiteboardRef.current.height

        pushDrawData({
            x0: x0 / w,
            x1: x1 / w,
            y0: y0 / h,
            y1: y1 / h,
            color,
        });
    }

    const onMouseDown = (e: any) => {
        drawing = true
        current.x = (e.clientX || e.touches[0].clientX) - (e.target.offsetLeft || e.touches[0].offsetLeft)
        current.y = (e.clientY || e.toches[0].clientY) - (e.target.offsetTop || e.touches[0].offsetTop)
    }

    const onMouseUp = (e: any) => {
        if (!drawing) {
            return
        }
        drawing = false
        drawLine(
            current.x,
            (e.clientX || e.touches[0].clientX) - (e.target.offsetLeft || e.touches[0].offsetLeft),
            current.y,
            (e.clientY || e.toches[0].clientY) - (e.target.offsetTop || e.touches[0].offsetTop),
            current.color,
            true
        )
    }

    const onMouseMove = (e: any) => {
        if (!drawing) {
            return
        }
        drawLine(
            current.x,
            (e.clientX || e.touches[0].clientX) - (e.target.offsetLeft || e.touches[0].offsetLeft),
            current.y,
            (e.clientY || e.toches[0].clientY) - (e.target.offsetTop || e.touches[0].offsetTop),
            current.color,
            true
        )
        current.x = (e.clientX || e.touches[0].clientX) - (e.target.offsetLeft || e.touches[0].offsetLeft)
        current.y = (e.clientY || e.toches[0].clientY) - (e.target.offsetTop || e.touches[0].offsetTop)
    }

    const throttle = (callback: any, delay: any) => {
        let previousCall = Date.now()
        return function () {
            let time = Date.now()

            if (time - previousCall >= delay) {
                previousCall = time
                callback.apply(null, arguments)
            }
        }
    }

    const updateColor = (e: any) => {
        current.color = e.target.className.split(' ')[1]
        pushDrawData({})
    }

    const handleResize = () => {
        if (!whiteboardRef.current) {
            return
        }

        const perent = document.querySelector('.pusher-container')!
        whiteboardRef.current.width = perent.clientWidth
        whiteboardRef.current.height = perent.clientHeight
    }

    const pushDrawData = async (data: any) => {
        const res = await fetch('/api/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            console.error('event not sent')
        }
    }

    useEffect(() => {
        if (!whiteboardRef.current) {
            return
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [whiteboardRef.current])

    return <>
        <div className="pusher-container">
            <canvas className="whiteboard" ref={whiteboardRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseOut={onMouseUp}
                onMouseMove={throttle(onMouseMove, 10)}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
                onTouchCancel={onMouseUp}
                onTouchMove={throttle(onMouseMove, 10)}
            ></canvas>
            <div className="colors">
                <div className="color black" onClick={updateColor}></div>
                <div className="color red" onClick={updateColor}></div>
                <div className="color green" onClick={updateColor}></div>
                <div className="color blue" onClick={updateColor}></div>
                <div className="color yellow" onClick={updateColor}></div>
            </div>
        </div>
    </>
}

export default PusherComponent
