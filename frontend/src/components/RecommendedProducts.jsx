import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, TrendingUp, Eye, Award, Users, Tag, DollarSign } from 'lucide-react'
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

function ItemCard({ id, name, rating, price, image, badges }) {
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
                    
                    {/* Recommendation Badges - Fixed z-index to stay within card context */}
                    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {badges?.sameCategory && (
                            <RecommendationBadge
                                type="category"
                                icon={Tag}
                                text="Same Category"
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
                        {badges?.similarPrice && (
                            <RecommendationBadge
                                type="price"
                                icon={DollarSign}
                                text="Similar Price"
                                bgColor="bg-blue-100 shadow-lg backdrop-blur-sm bg-opacity-95"
                                textColor="text-blue-800"
                            />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between p-3">
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight group-hover:text-blue-600">
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
                            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                                Popular
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default function RecommendedProducts({ productId, title = "Recommended for You" }) {
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
                
                const response = await axios.get(`${API_URL}/api/recommend/products/${productId}?limit=15`)
                
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
                console.error('Error fetching recommendations:', err)
                setError('Failed to load recommendations')
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
                    {[...Array(5)].map((_, index) => (
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
                        <p className="text-gray-600">
                            {error || 'No recommendations available at the moment'}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mb-8 bg-white px-5 pt-8 xl:px-50">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-normal">{title}</h2>
                
                {/* Recommendation Info */}
                {recommendationInfo && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="rounded bg-gray-100 px-2 py-1">
                            {recommendationInfo.method === 'cosine_similarity' && 'AI Powered'}
                            {recommendationInfo.method === 'hybrid' && 'Smart Match'}
                            {recommendationInfo.method === 'category_fallback' && 'Category Based'}
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
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                {!atStart && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white shadow-lg transition-all hover:bg-black/60"
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                )}

                {!atEnd && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white shadow-lg transition-all hover:bg-black/60"
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                )}
            </div>

            {/* Debug Info (only in development) */}
            {import.meta.env.VITE_ENV === 'development' && recommendationInfo && (
                <div className="mt-4 rounded bg-gray-50 p-3 text-xs text-gray-600">
                    <strong>Debug:</strong> Method: {recommendationInfo.method} | 
                    Processing: {recommendationInfo.processingTime}ms | 
                    Results: {recommendationInfo.total}
                </div>
            )}
        </div>
    )
}