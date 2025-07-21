import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, User, ShoppingCart, Plus } from 'lucide-react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Navbar() {
    const [login, setLogin] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    //for cart count
    const [user, setUser] = useState({})
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setLogin(res.data.success)
                setUser(res.data.user)
                setCartCount(res.data.user._count.CartItems)
            })
            .catch((err) => console.error(err))
    }, [login])

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
        <nav className="fixed top-0 left-0 z-10 flex h-14 w-full items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3 text-white md:h-16 md:py-4 xl:px-50">
            <div className="flex shrink-0 items-center gap-2 text-[22px]">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="h-8 w-8 md:h-10 md:w-10"
                        src="/icons/logo_white.png"
                        alt="logo"
                    />
                    <span className="hidden sm:inline">SmartCart</span>
                </Link>
            </div>

            <div className="mx-4 flex max-w-2xl min-w-0 flex-1 items-center overflow-hidden rounded-3xl border border-gray-600 bg-gray-700 px-4 focus-within:border-white">
                <input
                    className="h-8 w-full bg-transparent text-sm text-white placeholder-gray-300 focus:outline-none sm:text-base"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link
                    to={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="ml-2 cursor-pointer text-gray-300 hover:text-white"
                >
                    <Search className="h-5 w-5" />
                </Link>
            </div>

            <div className="flex shrink-0 items-center gap-4 text-sm whitespace-nowrap text-gray-200 md:gap-8 md:text-base">
                {login && (
                    <Link
                        to="/new-product"
                        className="relative flex cursor-pointer items-center gap-2 hover:text-white"
                    >
                        <Plus className="hidden h-5 w-5 md:inline" />
                        Add
                    </Link>
                )}

                <div className="flex items-center gap-2">
                    {!login ? (
                        <Link
                            to="/login"
                            className="flex cursor-pointer items-center gap-2 hover:text-white"
                        >
                            <User className="hidden h-5 w-5 md:inline" />
                            <span>Login</span>
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="flex cursor-pointer items-center gap-2 hover:text-white"
                        >
                            <User className="hidden h-5 w-5 md:inline" />
                            <span>Logout</span>
                        </button>
                    )}
                </div>

                {login && (
                    <Link
                        to="/cart"
                        className="relative flex cursor-pointer items-center gap-2 hover:text-white"
                    >
                        <ShoppingCart className="hidden h-5 w-5 md:inline" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-400 text-xs text-white">
                                {cartCount}
                            </span>
                        )}
                        <span>Cart</span>
                    </Link>
                )}

                {login && (
                    <Link
                        to="/profile"
                        className="relative flex items-center hover:text-white"
                    >
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="h-5 w-5 rounded-full object-cover md:h-8 md:w-8"
                            />
                        ) : (
                            <User className="h-5 w-5 rounded-full bg-gray-600 p-1 md:h-8 md:w-8" />
                        )}
                    </Link>
                )}
            </div>
        </nav>
    )
}
