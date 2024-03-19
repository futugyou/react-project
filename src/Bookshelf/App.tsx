import './App.css'

import { useState, useEffect } from 'react'
import EpubReader from '@/Common/EpubReader'

import { Cards } from "@cloudscape-design/components"

const App = (props: any) => {
    const [currentBook, setCurrentBook] = useState<any>(undefined)
    const [showList, setShowList] = useState(true)

    const imageList = [
        { src: './images/wu-chapter-001.jpg', alt: 'chapter-001', file: './epub/wu-chapter-001.epub' },
        { src: './images/wu-chapter-002.jpg', alt: 'chapter-002', file: './epub/wu-chapter-002.epub' },
        { src: './images/wu-chapter-003.jpg', alt: 'chapter-003', file: './epub/wu-chapter-003.epub' },
    ]

    const chooseBook = (b: any) => {
        setCurrentBook({ ...b })
    }

    const HandleIconClick = () => {
        setShowList(s => !s)
    }

    return (
        <div className='bookshelf'>
            {showList && (
                <div className={currentBook == undefined ? 'book-list fix' : 'book-list'}>
                    <Cards
                        cardDefinition={{
                            header: item => (
                                <span>{item.alt}</span>
                            ),
                            sections: [
                                {
                                    id: "Image",
                                    content: (item) => (
                                        <img
                                            style={{ width: "100%" }}
                                            src={item.src}
                                            alt={item.alt}
                                            onClick={() => chooseBook(item)}
                                        />
                                    )
                                }
                            ]
                        }}
                        items={imageList}
                        loadingText="Loading resources"
                    />
                </div>
            )}
            {currentBook != undefined && (
                <div className='book-content' >
                    <div className='list-display-icon' onClick={HandleIconClick}>+</div>
                    <EpubReader
                        epubcfikey={currentBook?.alt ?? 'fake-id'}
                        url={currentBook?.file}
                        title={"The book is sourced from the '洛琪希图书馆'"}>
                    </EpubReader>
                </div>
            )}
        </div>
    )
}

export default App
