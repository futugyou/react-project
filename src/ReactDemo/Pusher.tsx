import './Pusher.css'

import { useEffect, useRef, MouseEvent, TouchEvent } from 'react'
import Pusher from 'pusher-js'

export interface PusherDataType {
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    color: string
}

const PusherComponent = () => {
    const whiteboardRef = useRef<HTMLCanvasElement>(null)

    var pusher = new Pusher(import.meta.env.REACT_APP_PUSHER_KEY, {
        cluster: import.meta.env.REACT_APP_PUSHER_CLUSTER
    })

    let baseUrl = import.meta.env.BASE_URL
    if (window.__MICRO_APP_ENVIRONMENT__) {
        if (window.__MICRO_APP_BASE_ROUTE__) {
            baseUrl = window.__MICRO_APP_BASE_ROUTE__
        } else {
            baseUrl = "/react/"
        }
    } else {
        const path = window.location.pathname;
        baseUrl = path.startsWith('/react') ? '/react/' : '/';
    }
    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'

    const onDrawingEvent = ({ x0, x1, y0, y1, color }: PusherDataType) => {
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

    const drawLine = (x0: number, x1: number, y0: number, y1: number, color: string, emit: boolean) => {
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

    const onMouseDown = (e: MouseEvent) => {
        drawing = true
        const t = e.target as HTMLElement
        current.x = e.clientX - t.offsetLeft
        current.y = e.clientY - t.offsetTop
    }

    const onTouchStart = (e: TouchEvent) => {
        drawing = true
        const t = e.target as HTMLElement
        var rect = t.getBoundingClientRect()
        current.x = e.touches[0].clientX - rect.x
        current.y = e.touches[0].clientY - rect.y
    }

    const onMouseUp = (e: MouseEvent) => {
        if (!drawing) {
            return
        }

        drawing = false
        const t = e.target as HTMLElement
        drawLine(
            current.x,
            e.clientX - t.offsetLeft,
            current.y,
            e.clientY - t.offsetTop,
            current.color,
            true
        )
    }

    const onTouchEnd = (e: TouchEvent) => {
        if (!drawing) {
            return
        }

        drawing = false
        const t = e.target as HTMLElement
        var rect = t.getBoundingClientRect()
        drawLine(
            current.x,
            e.touches[0].clientX - rect.x,
            current.y,
            e.touches[0].clientY - rect.y,
            current.color,
            true
        )
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!drawing) {
            return
        }

        const t = e.target as HTMLElement
        drawLine(
            current.x,
            e.clientX - t.offsetLeft,
            current.y,
            e.clientY - t.offsetTop,
            current.color,
            true
        )

        current.x = e.clientX - t.offsetLeft
        current.y = e.clientY - t.offsetTop
    }

    const onTouchMove = (e: TouchEvent) => {
        if (!drawing) {
            return
        }

        const t = e.target as HTMLElement
        var rect = t.getBoundingClientRect()
        drawLine(
            current.x,
            e.touches[0].clientX - rect.x,
            current.y,
            e.touches[0].clientY - rect.y,
            current.color,
            true
        )
        current.x = e.touches[0].clientX - rect.x
        current.y = e.touches[0].clientY - rect.y
    }

    const throttle = (callback: any, delay: number) => {
        let previousCall = Date.now()
        return function () {
            let time = Date.now()

            if (time - previousCall >= delay) {
                previousCall = time
                callback.apply(null, arguments)
            }
        }
    }

    const updateColor = (e: MouseEvent) => {
        const t = e.target as HTMLElement
        current.color = t.className.split(' ')[1]
        // pushDrawData({})
    }

    const handleResize = () => {
        if (!whiteboardRef.current) {
            return
        }

        const perent = document.querySelector('.pusher-container')!
        whiteboardRef.current.width = perent.clientWidth
        whiteboardRef.current.height = perent.clientHeight
    }

    const pushDrawData = async (data: PusherDataType) => {
        const res = await fetch(baseUrl + 'api/push', {
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
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchEnd}
                onTouchMove={throttle(onTouchMove, 10)}
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
