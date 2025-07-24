import { useState, useEffect } from 'react'
import { Edit3, Trash2 } from 'lucide-react'

import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Listings({ listings = [] }) {
    const ITEMS_PER_ROW = 5
    const ROWS_TO_LOAD = 2
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_ROW)
    const [editingId, setEditingId] = useState(null)
    const [newPrice, setNewPrice] = useState('')
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        setVisibleCount(ITEMS_PER_ROW)
        setEditingId(null)
        setDeletingId(null)
        setNewPrice('')
    }, [listings])

    const displayedItems = listings.slice(0, visibleCount)

    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_ROW * ROWS_TO_LOAD, listings.length)
        )
    }

    const savePrice = async () => {
        if (!newPrice || isNaN(newPrice)) {
            alert('Please enter a valid price')
            return
        }

        try {
            const response = await axios.patch(
                `${API_URL}/api/product/edit-price`,
                {
                    id: editingId,
                    price: parseFloat(newPrice),
                },
                { withCredentials: true }
            )

            alert(response.data.msg)

            setEditingId(null)
            setNewPrice('')
        } catch (error) {
            console.error('Failed to update price:', error)
            alert('Failed to update price. Please try again.')
        }
    }

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(
                `${API_URL}/api/product/delete`,
                {
                    params: { id: deletingId },
                    withCredentials: true,
                }
            )

            alert(response.data.msg)

            setDeletingId(null)
        } catch (error) {
            console.error('Failed to delete product:', error)
            alert('Failed to delete product. Please try again.')
        }
    }

    return (
        <div className="mb-8">
            <div className="mb-6 flex items-center justify-between px-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Your Listings
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {displayedItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                        <div className="h-32 bg-gray-100">
                            <img
                                src={item.imageURL || item.image}
                                alt={item.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-1 line-clamp-2 font-medium text-gray-900">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Rs.{item.price}
                                    </p>
                                </div>
                                <span
                                    className={`rounded px-2 py-1 text-xs font-medium ${
                                        item.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {item.status || 'Active'}
                                </span>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        setEditingId(item.id)
                                        setNewPrice(item.price)
                                    }}
                                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => setDeletingId(item.id)}
                                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load more button */}
            {visibleCount < listings.length && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Edit Price Modal */}
            {editingId && (
                <div className="bg-opacity-20 fixed inset-0 flex items-center justify-center">
                    <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold">
                            Edit Price
                        </h3>
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingId(null)}
                                className="rounded border border-gray-300 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={savePrice}
                                className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="bg-opacity-20 fixed inset-0 flex items-center justify-center">
                    <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold">
                            Confirm Delete
                        </h3>
                        <p>Are you sure you want to delete this listing?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setDeletingId(null)}
                                className="rounded border border-gray-300 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
