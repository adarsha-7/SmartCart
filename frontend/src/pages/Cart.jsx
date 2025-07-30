import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import OrderCalculator from '../components/OrderCalculator'
import { useState, useEffect } from 'react'

import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Cart() {
    const [user, setUser] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                return axios.get(
                    `${API_URL}/api/product/cart-items?userID=${res.data.user.id}`
                )
            })
            .then((res) => {
                setItems(res.data.cartItems)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <div className="xl:px-50">
            <Navbar />
            {items.length === 0 ? (
                <div className="mt-20 ml-[50px] text-lg text-gray-500 md:mt-26">
                    There are no items in your cart.
                </div>
            ) : (
                <>
                    <div className="mt-14 ml-[50px] pt-10 md:mt-16">
                        <h1 className="text-4xl font-semibold">
                            Shopping Cart
                        </h1>
                        <div>
                            <p>{items.length} Items</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-20">
                        <div className="mt-[39px] ml-[50px] w-[800px] rounded-t-sm border border-gray-200">
                            <div className="flex h-10 items-center rounded-t-sm border-b border-gray-200 bg-gray-100 font-bold">
                                <div className="ml-[10px] w-[360px]">
                                    Product
                                </div>
                                <div className="flex w-[100px] justify-center">
                                    Price
                                </div>
                                <div className="flex w-[150px] justify-center">
                                    Quantity
                                </div>
                                <div className="flex w-[125px] justify-center">
                                    Total
                                </div>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto">
                                {items.map((item, index) => (
                                    <CartItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.product.name}
                                        description={item.product.description}
                                        price={item.product.price}
                                        quantity={item.quantity}
                                        image={item.product.imageURL}
                                        index={index}
                                        items={items}
                                        setItems={setItems}
                                        userID={user.id}
                                        isLast={index === items.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                        <OrderCalculator items={items} user={user} />
                    </div>
                </>
            )}
        </div>
    )
}
