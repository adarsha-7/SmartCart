import { useState, useEffect } from 'react'
import { Package, ShoppingCart } from 'lucide-react'

import Listings from './Listings'
import Orders from './Orders'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function SellerDashboard({ first_name }) {
    const [dashboard, setDashboard] = useState({ listings: [], orders: [] })

    useEffect(() => {
        axios
            .get(`${API_URL}/api/user/dashboard`, {
                withCredentials: true,
            })
            .then((res) => {
                setDashboard(res.data)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <div className="px-4 pt-[90px]">
            <div className="mb-10 flex flex-col items-center text-center">
                <h1 className="text-3xl font-semibold text-gray-900">
                    {'Welcome back' + (first_name ? `, ${first_name}` : '')}
                </h1>
                <p className="mt-2 text-gray-500">
                    Manage your listings and orders with ease.
                </p>
            </div>

            <div className="mx-auto mb-10 grid max-w-md grid-cols-1 justify-center gap-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                    <div className="mb-3 flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">
                            Total Listings
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                        {dashboard.listings.length}
                    </div>
                </div>
            </div>

            <div className="mx-auto mb-10 grid max-w-3xl grid-cols-2 justify-center gap-4">
                <button className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50">
                    <Package className="h-6 w-6 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">
                        My orders
                    </span>
                </button>
                <button className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50">
                    <ShoppingCart className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-700">
                        My listings
                    </span>
                </button>
            </div>

            <div className="mx-auto max-w-5xl">
                <Listings listings={dashboard.listings} />
                <Orders orders={dashboard.orders} />
            </div>
        </div>
    )
}
