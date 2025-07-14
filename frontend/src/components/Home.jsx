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
            <Navbar />
            <main className="mt-14 md:mt-16">
                <TrendingProducts products={data.trendingProducts} />
                <FeaturedProducts products={data.featuredProducts} />
                <Category categories={data.categories} />
            </main>
            <Footer />
        </>
    )
}
