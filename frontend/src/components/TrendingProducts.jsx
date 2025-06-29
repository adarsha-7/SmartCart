import { useState, useEffect, useRef } from 'react'

import ItemCard from './ItemCard'

import items from './itemsSample.js'

export default function TrendingProducts() {
    const [atStartTP, setatStartTP] = useState(true)
    const [atEndTP, setatEndTP] = useState(false)

    const scrollRefTP = useRef(null)

    useEffect(() => {
        const section = scrollRefTP.current
        if (!section) return

        const handleScroll = () => {
            setatStartTP(section.scrollLeft === 0)
            setatEndTP(
                section.scrollLeft + section.clientWidth >=
                    section.scrollWidth - 1
            )
        }

        handleScroll()

        section.addEventListener('scroll', handleScroll)

        return () => section.removeEventListener('scroll', handleScroll)
    }, [])

    const scroll = (direction) => {
        if (!scrollRefTP.current) return

        const screenWidth = window.innerWidth
        const cardWidth = 185
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
            scrollRefTP.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            })
        } else {
            scrollRefTP.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="flex h-100 flex-col gap-5 bg-white px-5 pt-15 pb-5 xl:px-50">
            <h2 className="text-3xl font-normal">Trending Now</h2>

            <div className="relative">
                <div
                    ref={scrollRefTP}
                    className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-2"
                >
                    {items.map((item) => (
                        <ItemCard id={item.id} key={item.id} />
                    ))}
                </div>

                {!atStartTP && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 left-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/60"
                    >
                        ←
                    </button>
                )}

                {!atEndTP && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 right-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/60"
                    >
                        →
                    </button>
                )}
            </div>
        </div>
    )
}
