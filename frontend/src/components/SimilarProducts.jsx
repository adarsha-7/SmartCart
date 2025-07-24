import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, TrendingUp, Eye, Tag, DollarSign, Sparkles } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_ENV == 'development' 
    ? import.meta.env.VITE_API_URL_DEV 
    : import.meta.env.VITE_API_URL

function RecommendationBadge({ type, icon: Icon, text, bgColor, textColor }) {
    return (
        <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${bgColor} ${textColor}`}>
            <Icon className="h-3 w-3" />
            {text}
        </span>
    )
}

function ItemCard({ id, name, rating, price, image, badges, recommendationType }) {
    return (
        <Link to={`/product/${id}`} className="group">
            <div className="relative flex h-64 w-48 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                {/* Product Image Container */}
                <div className="relative flex h-32 items-center justify-center bg-gray-50 p-4 overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    {/* Recommendation Type Badge - Top Right */}
                    {recommendationType && (
                        <div className="absolute top-2 right-2 z-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-2 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm bg-opacity-95">
                            <Sparkles className="h-3 w-3 inline mr-1" />
                            {recommendationType === 'trending' && 'Hot'}
                            {recommendationType === 'featured' && 'Pick'}
                            {recommendationType === 'category' && 'Match'}
                            {recommendationType === 'popular' && 'Loved'}
                            {recommendationType === 'recent' && 'New'}
                        </div>
                    )}
                    
                    {/* Recommendation Badges - Top Left */}
                    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {badges?.sameCategory && (
                            <RecommendationBadge
                                type="category"
                                icon={Tag}
                                text="Similar"
                                bgColor="bg-green-100 shadow-lg backdrop-blur-sm bg-opacity-95"
                                textColor="text-green-800"
                            />
                        )}
                        {badges?.trending && (
                            <RecommendationBadge
                                type="trending"
                                icon={TrendingUp}
                                text="Trending"
                                bgColor="bg-orange-100 shadow-lg backdrop-blur-sm bg-opacity-95"
                                textColor="text-orange-800"
                            />
                        )}
                        {badges?.featured && (
                            <RecommendationBadge
                                type="featured"
                                icon={Eye}
                                text="Featured"
                                bgColor="bg-purple-100 shadow-lg backdrop-blur-sm bg-opacity-95"
                                textColor="text-purple-800"
                            />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between p-3">
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight group-hover:text-purple-600">
                            {name}
                        </h3>
                        
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">
                                Rs.{price}
                            </p>
                            
                            {rating > 0 && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">
                                        {rating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Additional badges at bottom */}
                    <div className="flex flex-wrap gap-1">
                        {badges?.highRated && (
                            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                Top Rated
                            </span>
                        )}
                        {badges?.popular && (
                            <span className="rounded bg-pink-100 px-2 py-1 text-xs text-pink-800">
                                Popular
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default function Similar({ productId, title = "You might also like" }) {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const [recommendationInfo, setRecommendationInfo] = useState(null)

    const scrollRef = useRef(null)

    useEffect(() => {
        if (!productId) return

        const fetchRecommendations = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const response = await axios.get(`${API_URL}/api/recommend/similar/${productId}?limit=12`)
                
                if (response.data.recommendations) {
                    setRecommendations(response.data.recommendations)
                    setRecommendationInfo({
                        method: response.data.method,
                        total: response.data.total,
                        processingTime: response.data.processingTime
                    })
                } else {
                    setRecommendations([])
                }
            } catch (err) {
                console.error('Error fetching you might also like:', err)
                setError('Failed to load suggestions')
                setRecommendations([])
            } finally {
                setLoading(false)
            }
        }

        fetchRecommendations()
    }, [productId])

    useEffect(() => {
        const section = scrollRef.current
        if (!section) return

        const handleScroll = () => {
            setAtStart(section.scrollLeft === 0)
            setAtEnd(
                section.scrollLeft + section.clientWidth >= section.scrollWidth - 1
            )
        }

        handleScroll()
        section.addEventListener('scroll', handleScroll)
        return () => section.removeEventListener('scroll', handleScroll)
    }, [recommendations])

    const scroll = (direction) => {
        if (!scrollRef.current) return

        const screenWidth = window.innerWidth
        const scrollAmount = screenWidth < 1280 ? screenWidth - 100 : screenWidth - 500

        scrollRef.current.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        })
    }

    if (loading) {
        return (
            <div className="mb-8 bg-white px-5 pt-8 xl:px-50">
                <h2 className="mb-5 text-2xl font-normal">{title}</h2>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-64 w-48 flex-shrink-0 animate-pulse rounded-lg bg-gray-200" />
                    ))}
                </div>
            </div>
        )
    }

    if (error || recommendations.length === 0) {
        return (
            <div className="mb-8 bg-white px-5 pt-8 xl:px-50">
                <h2 className="mb-5 text-2xl font-normal">{title}</h2>
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                        <div className="mb-2 text-4xl text-gray-400">✨</div>
                        <p className="text-gray-600">
                            {error || 'No suggestions available at the moment'}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 px-5 pt-8 xl:px-50">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-normal text-gray-800">{title}</h2>
                </div>
                
                {/* Recommendation Info */}
                {recommendationInfo && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="rounded bg-purple-100 px-2 py-1 text-purple-700">
                            ✨ Diverse Mix
                        </span>
                        <span>{recommendationInfo.total} found</span>
                        <span>{recommendationInfo.processingTime}ms</span>
                    </div>
                )}
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="scrollbar-hide flex items-center gap-6 overflow-x-auto scroll-smooth px-2 py-4"
                >
                    {recommendations.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            rating={item.rating}
                            price={item.price}
                            image={item.imageURL}
                            badges={item.recommendationBadges}
                            recommendationType={item.recommendationType}
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                {!atStart && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-600/20 text-purple-700 shadow-lg transition-all hover:bg-purple-600/60 hover:text-white"
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                )}

                {!atEnd && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-600/20 text-purple-700 shadow-lg transition-all hover:bg-purple-600/60 hover:text-white"
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                )}
            </div>

            {/* Debug Info (only in development) */}
            {import.meta.env.VITE_ENV === 'development' && recommendationInfo && (
                <div className="mt-4 rounded bg-purple-50 p-3 text-xs text-purple-700 border border-purple-200">
                    <strong>Debug (You Might Also Like):</strong> Method: {recommendationInfo.method} | 
                    Processing: {recommendationInfo.processingTime}ms | 
                    Results: {recommendationInfo.total}
                </div>
            )}
        </div>
    )
}