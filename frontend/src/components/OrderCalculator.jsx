import { useState } from 'react'
import axios from 'axios'
import { Aperture } from 'lucide-react'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function OrderCalculator({ items, user }) {
    const [showConfirm, setShowConfirm] = useState(false)

    const subtotal = items.reduce(
        (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
        0
    )

    const shipping = subtotal > 0 ? subtotal * 0.02 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const handleCheckout = () => {
        setShowConfirm(true)
    }

    const handleConfirm = () => {
        if (
            !user.address ||
            !user.email ||
            !user.phone_number ||
            !user.first_name ||
            !user.last_name
        ) {
            alert(
                'Please fill out your details in user profile page before ordering.'
            )
        } else {
            axios
                .post(
                    `${API_URL}/api/order`,
                    { items },
                    { withCredentials: true }
                )
                .then((res) => {
                    alert(res.data.msg)
                    setShowConfirm(false) // hide dialog
                    // Delay to let alert be seen, then reload to reset UI
                    setTimeout(() => {
                        window.location.reload()
                    }, 300)
                })
                .catch((err) => {
                    console.error(err)
                    alert('Error occured. Order could not be placed.')
                })
        }
    }

    return (
        <>
            <div className="top-[140px] right-[20px] h-auto w-[400px] rounded-2xl border border-gray-200">
                <div className="p-3">
                    <h2 className="pb-4 text-2xl font-semibold">
                        Order Summary
                    </h2>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Subtotal</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Shipping</span>
                        <span>Rs. {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Tax</span>
                        <span>Rs. {tax.toFixed(2)}</span>
                    </div>
                </div>
                <hr className="ml-5 w-5/6 border-t border-gray-200 pb-6" />
                <div className="p-3">
                    <div className="flex justify-between text-[20px] font-bold">
                        <span className="pb-3">Total</span>
                        <span>Rs. {total.toFixed(2)}</span>
                    </div>
                    <div
                        className="mt-2 flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800 text-white hover:bg-gray-900"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="w-[500px] rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Confirm Order
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Are you sure you want to order the following items?
                        </p>
                        <div className="max-h-60 overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="mb-2 flex justify-between border-b pb-2 text-sm"
                                >
                                    <span>
                                        {item.product.name} × {item.quantity}
                                    </span>
                                    <span>
                                        Rs.{' '}
                                        {(
                                            item.product.price * item.quantity
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>Rs. {total.toFixed(2)}</span>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="cursor-pointer rounded-lg border border-gray-400 px-4 py-2 hover:bg-gray-100"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
                                onClick={handleConfirm}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
