import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'
import TrendingProducts from './TrendingProducts'
import FeaturedProducts from './FeaturedProducts'
import Category from './Category'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function ProductDetail() {
    const [product, setProduct] = useState({})
    const { id } = useParams()

    const location = useLocation()
    useEffect(() => {
        axios
            .get(`${API_URL}/api/product?id=${id}`)
            .then((res) => setProduct(res.data.product))
    }, [location])

    //determine if user is logged in or not, if yes, give "add to cart" option

    const [login, setLogin] = useState(false)

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

    // function for "add to cart" functionality

    const [message, setMessage] = useState('')

    const [data, setData] = useState({
        trendingProducts: [],
        featuredProducts: [],
        categories: [],
    })
    useEffect(() => {
        axios.get(`${API_URL}/api/home/content`).then((res) => {
            setData(res.data)
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
            .catch((error) => console.error(error))
    }

    const { name, price, imageURL, rating, specs, description } = product

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
                        <h1 className="mb-4 text-3xl font-bold">{name}</h1>
                        <p className="mb-2 text-2xl font-semibold text-gray-800">
                            Rs. {price}
                        </p>
                        <p className="mb-6 text-lg text-yellow-600">
                            ⭐ {rating}
                        </p>
                        <div className="mb-6">
                            <h2 className="mb-2 text-lg font-semibold">
                                Product Specifications
                            </h2>
                            <div className="flex flex-col text-gray-700">
                                {specs &&
                                    specs.map((spec, i) => (
                                        <p key={i}>- {spec}</p>
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
                                <button className="cursor-pointer rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                                    Buy Now
                                </button>
                            )}
                            {login && (
                                <button
                                    onClick={handleAddToCart}
                                    className="cursor-pointer rounded bg-black px-6 py-2 text-white hover:bg-gray-800"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>

                        {message && (
                            <p className="mt-4 text-sm text-red-500">
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <TrendingProducts products={data.trendingProducts} />
                <FeaturedProducts products={data.featuredProducts} />
                <Category categories={data.categories} />
            </div>

            <Footer />
        </>
    )
}
