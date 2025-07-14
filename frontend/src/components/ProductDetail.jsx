import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from "./Navbar" 
import Footer from "./Footer"
import TrendingProducts from "./TrendingProducts";
import FeaturedProducts from "./FeaturedProducts";
import Category from './Category'

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

    const { name, price, image, rating } = product

    return (
    
        <>
        <Navbar/>
        <div className="w-402 h-150 bg-white m-10 mt-18 p-10 flex space-x-20">
            <div className="w-[40%] h-full bg-amber-100">
                <img src={image}></img>
            </div>
            <div>
                <div>
                <p className="text-2xl font-bold leading-normal">{name}</p>
                <p className="space-x-8">
                    <span className="text-2xl font-bold leading-normal">Rs.{price} </span>
                    <span className="text-xl text-gray-400 leading-normal line-through">Rs.{Math.round(price*1.1)}</span>
                </p>
                <p className="text-xl leading-normal">⭐{rating}</p>
                </div>

                <div className="text-20 w-200 font-semibold leading-normal inline-block border-2 border-gray-200 rounded-lg my-6 p-5">
                    Product Specifications
                        <div className="flex flex-wrap">
                            <p className="w-1/2 p-2 font-normal">Spec1</p>
                            <p className="w-1/2 p-2 font-normal">Spec2</p>
                            <p className="w-1/2 p-2 font-normal">Spec3</p>
                            <p className="w-1/2 p-2 font-normal">Spec4</p>
                        </div>
                </div>

                <div>
                    Description
                </div>
                <div className="flex space-x-20">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition my-8">Buy Now</button>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition my-8">Add to Cart</button>
                </div>
            </div>
            
        </div>
        <TrendingProducts products={data.trendingProducts} />
        <FeaturedProducts products={data.featuredProducts} />
        <Footer/>
       </>

    );
}



// <div>
        //     <div>
        //         <img src={image}></img>
        //     </div>
        //     <div>
        //         <div>
        //             <h2>{name}</h2>
        //             <p>Rs. {price}</p>
        //             <p>⭐{rating}</p>
        //         </div>

        //         <div>Product Specifiaction</div>

        //         <div>Seller Information</div>

        //         {login && (
        //             <button
        //                 className="cursor-pointer"
        //                 onClick={handleAddToCart}
        //             >
        //                 Add to Cart
        //             </button>
        //         )}

        //         <p className="text-sm text-red-500">{message}</p>
        //     </div>
        // </d
