import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, User, ShoppingCart } from 'lucide-react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Navbar() {
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

    function logout() {
        axios
            .post(`${API_URL}/api/logout`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    window.location.reload()
                } else {
                    console.log('Logout Fail.')
                }
            })
            .catch((err) => console.error(err))
    }

    return (
        <nav className="fixed top-0 left-0 z-10 flex h-14 w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-3 md:h-16 md:py-4 xl:px-50">
            <div className="flex shrink-0 items-center gap-2 text-[22px] text-slate-800">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="h-8 w-8 md:h-10 md:w-10"
                        src="icons/logo.png"
                        alt="logo"
                    />
                    <span className="hidden sm:inline">SmartCart</span>
                </Link>
            </div>

            <div className="mx-4 flex max-w-2xl min-w-0 flex-1 items-center overflow-hidden rounded-3xl border border-gray-300 px-4 focus-within:border-gray-800">
                <input
                    className="h-8 w-full bg-transparent text-sm focus:outline-none sm:text-base"
                    type="text"
                    placeholder="Search"
                />
                <button className="ml-2 cursor-pointer text-gray-500 hover:text-gray-800">
                    <Search className="h-5 w-5" />
                </button>
            </div>

            <div className="flex shrink-0 items-center gap-4 text-sm whitespace-nowrap text-gray-700 md:gap-8 md:text-base">
                <div className="flex items-center gap-2">
                    {!login ? (
                        <Link
                            to="/login"
                            className="flex cursor-pointer items-center gap-2 hover:text-gray-800"
                        >
                            <User className="hidden h-5 w-5 md:inline" />
                            <span>Login</span>
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="flex cursor-pointer items-center gap-2 hover:text-gray-800"
                        >
                            <User className="hidden h-5 w-5 md:inline" />
                            <span>Logout</span>
                        </button>
                    )}
                </div>

                <Link
                    to="/cart"
                    className="flex cursor-pointer items-center gap-2 hover:text-gray-800"
                >
                    <ShoppingCart className="hidden h-5 w-5 md:inline" />
                    <span>Cart</span>
                </Link>
            </div>
        </nav>
    )
}
