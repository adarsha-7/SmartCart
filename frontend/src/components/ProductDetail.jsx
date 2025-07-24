import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { CheckCircle, Eye, Flame, ShoppingCart } from 'lucide-react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'
import RecommendedProducts from './RecommendedProducts'
import SimilarProducts from './SimilarProducts'
import Category from './Category'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function ProductDetail() {
    const [product, setProduct] = useState({})
    const [inCart, setInCart] = useState(false)
    const [login, setLogin] = useState(false)
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        categories: [],
    })

    const { id } = useParams()
    const location = useLocation()

    // Fetch product details
    useEffect(() => {
        axios.get(`${API_URL}/api/product?id=${id}`).then((res) => {
            const p = res.data.product
            setProduct(p)
            setInCart(p.CartItems && p.CartItems.length > 0)
            console.log(res.data.product)
        })
    }, [location, id])

    // Check authentication status
    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setLogin(res.data.success)
            })
            .catch((err) => console.error(err))
    }, [])

    // Fetch categories for footer
    useEffect(() => {
        axios.get(`${API_URL}/api/home/content`).then((res) => {
            setData({ categories: res.data.categories })
        })
    }, [])

    function handleAddToCart() {
        axios
            .post(
                `${API_URL}/api/product/add-to-cart`,
                { productID: id },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.success) {
                    setMessage('Product added to Cart Successfully')
                    setInCart(true)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                } else {
                    setMessage('Failed to add product to cart')
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                }
            })
            .catch((error) => {
                console.error(error)
                setMessage('Failed to add product to cart')
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
    }

    const { name, price, imageURL, rating, description } = product

    return (
        <>
            <Navbar />

            <div className="mt-24 px-5 xl:px-50">
                <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md md:flex-row">
                    <div className="flex items-center justify-center bg-gray-50 p-6 md:w-1/2">
                        <img
                            src={imageURL}
                            alt={name}
                            className="max-h-96 object-contain"
                        />
                    </div>

                    <div className="p-8 md:w-1/2">
                        <h1 className="mb-4 text-xl font-medium">{name}</h1>
                        <p className="mb-2 text-2xl font-semibold text-gray-800">
                            Rs. {price}
                        </p>
                        <p className="mb-6 text-lg text-yellow-600">
                            ⭐ {rating}
                        </p>

                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            {product.featuredProduct && (
                                <span className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                                    <Eye className="h-4 w-4" /> Featured
                                </span>
                            )}
                            {product.trendingProduct && (
                                <span className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">
                                    <Flame className="h-4 w-4" /> Trending
                                </span>
                            )}
                            {inCart && (
                                <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                    <CheckCircle className="h-4 w-4" /> In Cart
                                </span>
                            )}
                        </div>

                        <div className="mt-4 mb-6 flex items-center gap-4">
                            <img
                                src={product.user?.image}
                                alt={`${product.user?.first_name} ${product.user?.last_name}`}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-semibold">
                                    {product.user?.first_name}{' '}
                                    {product.user?.last_name}
                                </p>
                                <p className="text-xs text-gray-500">Seller</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h2 className="mb-2 text-sm font-semibold text-gray-600">
                                Categories
                            </h2>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {product.categories?.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="rounded bg-gray-100 px-3 py-1 text-gray-800"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                            <br />
                            <h2 className="mb-2 text-sm font-semibold text-gray-600">
                                Sub-Categories
                            </h2>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {product.subCategories?.map((sub) => (
                                    <span
                                        key={sub.id}
                                        className="rounded bg-gray-200 px-3 py-1 text-gray-700"
                                    >
                                        {sub.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="mb-2 text-lg font-semibold">
                                Description
                            </h2>
                            <p className="text-gray-700">
                                {description && description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {login && (
                                <button className="cursor-pointer rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors">
                                    Buy Now
                                </button>
                            )}
                            {login && !inCart && (
                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center gap-2 cursor-pointer rounded bg-black px-6 py-2 text-white hover:bg-gray-800 transition-colors"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Add to Cart
                                </button>
                            )}
                            {login && inCart && (
                                <button
                                    disabled
                                    className="flex items-center gap-2 cursor-not-allowed rounded bg-green-600 px-6 py-2 text-white"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    In Cart
                                </button>
                            )}
                        </div>

                        {message && (
                            <div className={`mt-4 p-3 rounded text-sm ${
                                message.includes('Successfully') 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AI-Powered Recommendations Section */}
            <div className="mt-12">
                <RecommendedProducts 
                    productId={id} 
                    title="Recommended for You"
                />
                
                {/* You might also like section with different algorithm */}
                <SimilarProducts 
                    productId={id} 
                    title="You might also like"
                />
                
                {/* Categories for general browsing */}
                <Category categories={data.categories} />
            </div>

            <Footer />
        </>
    )
}