import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Orders({ orders = [] }) {
    const ITEMS_PER_ROW = 5
    const ROWS_TO_LOAD = 2
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_ROW)
    const [showDialog, setShowDialog] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [rating, setRating] = useState('')

    useEffect(() => {
        setVisibleCount(ITEMS_PER_ROW)
    }, [orders])

    const displayedItems = orders.slice(0, visibleCount)

    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_ROW * ROWS_TO_LOAD, orders.length)
        )
    }

    const openDialog = (order) => {
        setSelectedOrder(order)
        setRating('')
        setShowDialog(true)
    }

    const handleOrderReceived = () => {
        setShowDialog(false)

        if (rating.trim() === '') {
            alert('Please provide a rating for the product.')
            return
        }

        axios
            .patch(
                `${API_URL}/api/order/confirmation`,
                {
                    orderId: selectedOrder.id,
                    rating: Number(rating),
                },
                { withCredentials: true }
            )
            .then((res) => {
                alert(res.data.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 300)
            })
            .catch((err) => {
                console.error(err)
                alert('Error occurred. Could not confirm order receipt.')
            })
    }

    return (
        <div className="mb-8">
            <div className="mb-6 flex items-center justify-between px-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Your Orders
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {displayedItems.map((order) => (
                    <div
                        key={order.id}
                        className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                        <div className="h-32 bg-gray-100">
                            <img
                                src={
                                    order.product.imageURL ||
                                    order.product.image
                                }
                                alt={order.product.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                            <div className="mb-3">
                                <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                                    {order.product.name}
                                </h3>
                                <p className="text-lg font-semibold text-gray-900">
                                    Rs.{order.product.price}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Quantity: {order.quantity}
                                </p>
                            </div>
                            <button
                                onClick={() => openDialog(order)}
                                className="mt-auto rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Order Received?
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < orders.length && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Dialog */}
            {showDialog && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="w-[400px] rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">
                            Confirm Order Received
                        </h2>
                        <p className="mb-2 text-gray-600">
                            Leave a rating for:{' '}
                            <strong>{selectedOrder.product.name}</strong>
                        </p>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            placeholder="Enter rating (1–5)"
                            className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrderReceived}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Confirm Order Received
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
