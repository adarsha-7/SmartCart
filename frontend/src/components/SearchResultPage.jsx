import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import ProductGrid from './ProductGrid'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function SearchResultPage() {
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

    useEffect(() => {
        if (!query) return

        axios
            .get(`${API_URL}/api/search?query=${encodeURIComponent(query)}`)
            .then((res) => {
                setProducts(res.data.products || [])
                console.log(res.data.msg)
            })
            .catch((err) => {
                console.error('Search error:', err)
                setProducts([])
            })
    }, [])

    return (
        <>
            <Navbar />
            <hr className="mt-4 border-t border-gray-200" />
            <ProductGrid products={products} />
        </>
    )
}
