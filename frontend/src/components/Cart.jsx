import cartItems from './productinfo.js'
import Navbar from './Navbar.jsx'
import OrderCalculator from './OrderCalculator.jsx'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function Cart() {
    const [items, setItems] = useState(cartItems)

    function addQuantity(index) {
        const updatedCart = items.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setItems(updatedCart)
    }

    function decreaseQuantity(index) {
        const updatedCart = items.map((item, i) => {
            if (i === index) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item
            }

            return item
        })
        setItems(updatedCart)
    }

    const removeItem = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }
    return (
        <div className="xl: px-5 px-50">
            <Navbar />
            {items.length === 0 ? (
                <div className="mt-14 ml-[50px] text-lg text-gray-500 md:mt-16">
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
                    <div className="flex gap-20">
                        <div className="top-[140px] left-[50px] mt-[39px] ml-[50px] w-[800px] rounded-t-sm border border-b-0 border-gray-200">
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
                            <div className="max-h-[452px] overflow-y-auto">
                                {items.map((item, index) => (
                                    <div className="flex border-b border-gray-200 p-2">
                                        <div className="flex w-[360px]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-24 w-24 border border-gray-50 object-cover"
                                            />
                                            <div className="ml-2">
                                                <h2 className="text-lg">
                                                    {item.name}
                                                </h2>
                                                <p className="text-sm font-light text-gray-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="flex w-[100px] items-center justify-center">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <div className="flex w-[150px] items-center justify-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="ml-2 flex items-center rounded-lg border border-gray-300">
                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                index
                                                            )
                                                        }
                                                        className="rounded-l-lg p-1 transition-colors hover:bg-gray-50"
                                                    >
                                                        <Minus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                    <span className="min-w-[40px] border-r border-l border-gray-300 px-3 py-1 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            addQuantity(index)
                                                        }
                                                        className="rounded-r-lg p-1 transition-colors hover:bg-gray-50"
                                                    >
                                                        <Plus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-[125px] items-center justify-center">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <OrderCalculator items={items} />
                    </div>
                </>
            )}
        </div>
    )
}
