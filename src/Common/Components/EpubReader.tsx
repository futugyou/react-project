import './EpubReader.css'

import React, { useState, useEffect, useRef } from 'react'

import { ReactReader } from 'react-reader'

export interface IEpubReaderProps {
    epubcfikey: string
    url: string | ArrayBuffer
    title: string
    children?: React.ReactNode
}

const EpubReader = (props: IEpubReaderProps) => {
    const [location, setLocation] = useState<any>(null)
    const [firstRenderDone, setFirstRenderDone] = useState(false)
    const renditionRef = useRef<any>(null)
    const [fullWindow, setFullWindow] = useState(false)

    const locationChanged = (epubcifi: any) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. 
        // It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0) 

        // Since this function is also called on initial rendering, we are using custom state
        // logic to check if this is the initial render.
        // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

        if (!firstRenderDone) {
            setLocation(localStorage.getItem(props.epubcfikey)) // getItem returns null if the item is not found.
            setFirstRenderDone(true)
            return
        }

        // This is the code that runs everytime the page changes, after the initial render.
        // Saving the current epubcifi on storage...
        localStorage.setItem(props.epubcfikey, epubcifi)
        // And then rendering it.
        setLocation(epubcifi) // Or setLocation(localStorage.getItem("book-progress"))
    }

    const fullDisplay = () => {
        setFullWindow(s => !s)
    }

    return (
        <div className={fullWindow ? 'ReaderContainer fix' : 'ReaderContainer'} >
            {/* {fullWindow && (<div className='ReaderClose' onClick={fullDisplay}>x</div>)}
            {!fullWindow && (<div className='ReaderClose' onClick={fullDisplay}>+</div>)} */}
            <ReactReader
                location={location}
                locationChanged={locationChanged}
                epubOptions={{
                    allowPopups: true,
                    allowScriptedContent: true,
                    flow: 'scrolled',
                    manager: 'continuous',
                }}
                url={props.url}
                getRendition={rendition => (renditionRef.current = rendition)}
                title={props.title}
            />
        </div>
    )
}

export default EpubReader