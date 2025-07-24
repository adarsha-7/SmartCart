import { useState, useEffect } from 'react'

export default function Orders({ orders = [] }) {
    const ITEMS_PER_ROW = 5
    const ROWS_TO_LOAD = 2
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_ROW)

    // Reset visibleCount when orders change
    useEffect(() => {
        setVisibleCount(ITEMS_PER_ROW)
    }, [orders])

    const displayedItems = orders.slice(0, visibleCount)

    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_ROW * ROWS_TO_LOAD, orders.length)
        )
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
                        </div>
                    </div>
                ))}
            </div>

            {/* Load more button */}
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
        </div>
    )
}
