import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

import TrendingProducts from './TrendingProducts'
import FeaturedProducts from './FeaturedProducts'
import Category from './Category'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Home() {
    //for cart count
    const [user, setUser] = useState({})
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                setCartCount(res.data.user._count.CartItems)
            })
            .catch((err) => console.error(err))
    }, [])

    //get content data
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

    return (
        <>
            <Navbar cartCount={cartCount} />
            <main className="mt-14 md:mt-16"></main>
            <TrendingProducts products={data.trendingProducts} />
            <FeaturedProducts products={data.featuredProducts} />
            <Category categories={data.categories} />
            <Footer />
        </>
    )
}
