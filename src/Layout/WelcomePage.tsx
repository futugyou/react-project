import './WelcomePage.css'

import { useState, useEffect } from 'react'
import EpubReader from '@/Common/EpubReader'
import Carousel from 'react-bootstrap/Carousel'

const WelcomePage = (props: any) => {
    const [index, setIndex] = useState(0)
    const [currentBook, setCurrentBook] = useState<any>(undefined)

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }

    const imageList = [
        { src: './images/wu-chapter-001.jpg', alt: 'chapter-001', file: './epub/wu-chapter-001.epub' },
        { src: './images/wu-chapter-002.jpg', alt: 'chapter-002', file: './epub/wu-chapter-002.epub' },
        { src: './images/wu-chapter-003.jpg', alt: 'chapter-003', file: './epub/wu-chapter-003.epub' },
    ]

    const chooseBook = (b: any) => {
        setCurrentBook({ ...b })
    }

    return (
        <div className='WelcomePage'>
            <div className='CarouselContainer' >
                <img className='WelcomePageImage'
                    src={imageList[index].src}
                    alt={imageList[index].alt}
                />
                <Carousel slide={false} className='Carousel' activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
                    {
                        imageList.map(p =>
                            <Carousel.Item className='CarouselItem' key={p.src} interval={3000}>
                                <img className='CarouselItemImage'
                                    src={p.src}
                                    alt={p.alt} onClick={() => chooseBook(p)}
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            </div>
            <EpubReader key={currentBook?.alt ?? 'fake-id'} url={currentBook?.file}></EpubReader>
        </div >
    )
}

export default WelcomePage