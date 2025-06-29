import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ItemCard from './ItemCard'

import items from './itemsSample.js'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Home() {
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const scrollRef = useRef(null)

    useEffect(() => {
        const section = scrollRef.current
        if (!section) return

        const handleScroll = () => {
            setAtStart(section.scrollLeft === 0)
            setAtEnd(
                section.scrollLeft + section.clientWidth >=
                    section.scrollWidth - 1
            )
        }

        handleScroll()

        section.addEventListener('scroll', handleScroll)

        return () => section.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => setMessage(res.data))
            .catch((err) => console.error(err))
    }, [])

    const scroll = (direction) => {
        if (!scrollRef.current) return

        const screenWidth = window.innerWidth
        const cardWidth = 180
        let scrollCount

        if (screenWidth < 640) {
            scrollCount = 2
        } else if (screenWidth < 768) {
            scrollCount = 3
        } else if (screenWidth < 1024) {
            scrollCount = 3.8
        } else if (screenWidth < 1280) {
            scrollCount = 5
        } else {
            scrollCount = 6
        }

        const scrollAmount = cardWidth * scrollCount

        if (direction === 'right') {
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            })
        } else {
            scrollRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <>
            <Navbar />
            <main className="mt-14 md:mt-16">
                <div className="flex h-100 flex-col gap-5 bg-white px-5 pt-15 pb-5 xl:px-50">
                    <h2 className="text-3xl font-normal">Trending Now</h2>

                    <div className="relative">
                        <div
                            ref={scrollRef}
                            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-2"
                        >
                            {items.map((item) => (
                                <ItemCard id={item.id} key={item.id} />
                            ))}
                        </div>

                        {!atStart && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute top-1/2 left-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/60"
                            >
                                ←
                            </button>
                        )}

                        {!atEnd && (
                            <button
                                onClick={() => scroll('right')}
                                className="absolute top-1/2 right-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/60"
                            >
                                →
                            </button>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
