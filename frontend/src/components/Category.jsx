import { useState, useEffect, useRef } from 'react'
import CategoryCard from './CategoryCard'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Category({ categories }) {
    const [atStartC, setatStartC] = useState(true)
    const [atEndC, setatEndC] = useState(false)
    const scrollRefC = useRef(null)

    useEffect(() => {
        const section = scrollRefC.current
        if (!section) return

        const handleScroll = () => {
            setatStartC(section.scrollLeft === 0)
            setatEndC(
                section.scrollLeft + section.clientWidth >=
                    section.scrollWidth + 1
            )
        }

        handleScroll()
        section.addEventListener('scroll', handleScroll)
        return () => section.removeEventListener('scroll', handleScroll)
    }, [])

    const scroll = (direction) => {
        if (!scrollRefC.current) return

        const screenWidth = window.innerWidth
        const scrollAmount =
            screenWidth < 1280 ? screenWidth - 100 : screenWidth - 500

        scrollRefC.current.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        })
    }

    return (
        <div className="flex flex-col gap-5 bg-white px-5 pb-5 xl:px-50">
            <h2 className="text-3xl font-normal">Shop by Category</h2>
            <div className="relative">
                <div
                    ref={scrollRefC}
                    className="scrollbar-hide flex h-60 items-center gap-5 overflow-x-auto scroll-smooth px-2"
                >
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            name={cat.name}
                            icon={cat.icon}
                            image={cat.imageURL}
                        />
                    ))}
                </div>

                {!atStartC && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 left-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/60"
                    >
                        ←
                    </button>
                )}

                {!atEndC && (
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
