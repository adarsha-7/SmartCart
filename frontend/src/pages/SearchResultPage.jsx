import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function SearchResultPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

    useEffect(() => {
        if (!query) {
            setProducts([])
            return
        }

        const performSearch = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const response = await axios.get(`${API_URL}/api/search?query=${encodeURIComponent(query)}`)
                setProducts(response.data.products || [])
                console.log(response.data.msg)
            } catch (err) {
                console.error('Search error:', err)
                setError('Failed to search products. Please try again.')
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        performSearch()
    }, [query]) // Added query as dependency - this was the missing piece!

    if (!query) {
        return (
            <>
                <Navbar />
                <div className="pt-16">
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No search query</h3>
                        <p className="text-gray-500">Please enter a search term to find products.</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="pt-16">
                {/* Search Results Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Search results for "{query}"
                        </h1>
                        {!loading && !error && (
                            <p className="text-sm text-gray-600 mt-1">
                                {products.length} {products.length === 1 ? 'product' : 'products'} found
                            </p>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-gray-600">Searching products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                        <p className="text-gray-500">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Products Grid with Search Features */}
                {!loading && !error && (
                    <ProductGrid products={products} showSearchFeatures={true} />
                )}
            </div>
        </>
    )
}