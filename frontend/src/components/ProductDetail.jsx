import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function ProductDetail() {
    const { id } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios
            .get(`${API_URL}/api/product?id=${id}`)
            .then((res) => setProduct(res.data.product))
    }, [])

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

    const { name, price, image, rating } = product

    return (
        <div>
            <div>
                <img src={image}></img>
            </div>
            <div>
                <div>
                    <h2>{name}</h2>
                    <p>Rs. {price}</p>
                    <p>⭐{rating}</p>
                </div>

                <div>Product Specifiaction</div>

                <div>Seller Information</div>

                {login && (
                    <button
                        className="cursor-pointer"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                )}

                <p className="text-sm text-red-500">{message}</p>
            </div>
        </div>
    )
}
