import axios from 'axios'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

import TrendingProducts from './TrendingProducts'
import FeaturedProducts from './FeaturedProducts'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Home() {
    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <>
            <Navbar />
            <main className="mt-14 md:mt-16"></main>
            <TrendingProducts />
            <FeaturedProducts />
            <Footer />
        </>
    )
}
