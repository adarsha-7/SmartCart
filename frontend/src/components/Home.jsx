import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Header from '../UIcomponents/Header'
import Footer from '../UIcomponents/Footer'
import ProductCard from '../UIcomponents/ProductCard'
import CategoryCard from '../UIcomponents/CategoryCard'
import '../CSS/home.css'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

function Home() {
    const [message, setMessage] = useState({})

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => setMessage(res.data))
            .catch((err) => console.error(err))
    }, [])

    const productList = [
        { id: 1, name: 'Laptop', img:'../../public/images/Black.png', price: '$999' },
        { id: 2, name: 'Phone', img:'../../public/images/Black.png', price: '$499' },
        { id: 3, name: 'Watch', img:'../../public/images/Black.png', price: '$199' },
        { id: 4, name: 'Mouse', img:'../../public/images/Black.png', price: '$199' },
        { id: 5, name: 'Laptop', img:'../../public/images/Black.png', price: '$999' },
        { id: 6, name: 'Phone', img:'../../public/images/Black.png', price: '$499' }
    ];

    const categoryList=[
        {id:1, name:'Electronics', img:'../../public/images/Black.png'},
        {id:2, name:'Fitness',img:'../../public/images/Black.png'},
        {id:3, name:'Books',img:'../../public/images/Black.png'},
        {id:4, name:'Furniture',img:'../../public/images/Black.png'},
        {id:5, name:'Home and Living',img:'../../public/images/Black.png'},
        {id:6, name:'Fashion',img:'../../public/images/Black.png'}
    ]
    return (
        <>
            <Header/>
            <div className='trending-section'>
                <h1>Trending Now</h1>
                <div className='trending-products'>
                    {productList.map(product=>(
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>


            <div className='categories-section'>
                <h1>Shop by Category</h1>
                <div className='categories'>
                    {categoryList.map(category=>(
                        <CategoryCard key={category.id} category={category}/>
                    ))}
                </div>
            </div>


            <div className='trending-section'>
                <h1>Featured Products</h1>
                <div className='trending-products'>
                    {productList.map(product=>(
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>

            

            <Footer/>
        </>
    );
}

export default Home;
