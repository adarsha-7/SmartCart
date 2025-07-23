import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import TrendingProducts from '../components/TrendingProducts'
import FeaturedProducts from '../components/FeaturedProducts'
import OtherProducts1 from '../components/OtherProducts1'
import OtherProducts2 from '../components/OtherProducts2'
import Category from '../components/Category'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Home() {
    //get content data
    const [data, setData] = useState({
        trendingProducts: [],
        featuredProducts: [],
        otherProducts: [],
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
                <OtherProducts1 products={data.otherProducts.slice(0, 20)} />
                <OtherProducts2 products={data.otherProducts.slice(20, 40)} />
                <Category categories={data.categories} />
            </main>
            <Footer />
        </>
    )
}
