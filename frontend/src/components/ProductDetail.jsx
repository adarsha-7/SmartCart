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
            </div>
        </div>
    )
}
