import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
    Search,
    User,
    ShoppingCart,
    Plus,
    X,
    Clock,
    TrendingUp,
} from 'lucide-react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Navbar() {
    const [login, setLogin] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [user, setUser] = useState({})
    const [cartCount, setCartCount] = useState(0)

    // Search suggestions state
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [popularSearches, setPopularSearches] = useState([])
    const [recentSearches, setRecentSearches] = useState([])

    const searchRef = useRef(null)
    const suggestionsRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.success) {
                    setLogin(res.data.success)
                    setUser(res.data.user)
                    setCartCount(res.data.user._count.CartItems)
                }
            })
            .catch((err) => console.error(err))
    }, [login])

    // Load recent searches from localStorage
    useEffect(() => {
        const recent = JSON.parse(
            localStorage.getItem('recentSearches') || '[]'
        )
        setRecentSearches(recent.slice(0, 5))
    }, [])

    // Load popular searches
    useEffect(() => {
        axios
            .get(`${API_URL}/api/search/popular`)
            .then((res) => setPopularSearches(res.data.popularSearches || []))
            .catch((err) =>
                console.error('Error loading popular searches:', err)
            )
    }, [])

    // Fetch suggestions as user types
    useEffect(() => {
        if (searchTerm.length >= 2) {
            const timeoutId = setTimeout(() => {
                axios
                    .get(
                        `${API_URL}/api/search/suggestions?q=${encodeURIComponent(searchTerm)}`
                    )
                    .then((res) => setSuggestions(res.data.suggestions || []))
                    .catch((err) => {
                        console.error('Error fetching suggestions:', err)
                        setSuggestions([])
                    })
            }, 300) // Debounce API calls

            return () => clearTimeout(timeoutId)
        } else {
            setSuggestions([])
        }
    }, [searchTerm])

    // Handle clicks outside search box
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target)
            ) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function logout() {
        axios
            .post(`${API_URL}/api/logout`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    window.location.href = '/'
                } else {
                    console.log('Logout Fail.')
                }
            })
            .catch((err) => console.error(err))
    }

    function handleSearch(query) {
        if (query.trim()) {
            // Add to recent searches
            const recent = JSON.parse(
                localStorage.getItem('recentSearches') || '[]'
            )
            const newRecent = [
                query,
                ...recent.filter((s) => s !== query),
            ].slice(0, 10)
            localStorage.setItem('recentSearches', JSON.stringify(newRecent))
            setRecentSearches(newRecent.slice(0, 5))

            // Navigate to search results
            navigate(`/search?q=${encodeURIComponent(query)}`)
            setShowSuggestions(false)
        }
    }

    function handleInputFocus() {
        setShowSuggestions(true)
    }

    function handleSuggestionClick(suggestion) {
        setSearchTerm(suggestion)
        handleSearch(suggestion)
    }

    function clearRecentSearches() {
        localStorage.removeItem('recentSearches')
        setRecentSearches([])
    }

    function removeRecentSearch(searchToRemove) {
        const recent = JSON.parse(
            localStorage.getItem('recentSearches') || '[]'
        )
        const filtered = recent.filter((s) => s !== searchToRemove)
        localStorage.setItem('recentSearches', JSON.stringify(filtered))
        setRecentSearches(filtered.slice(0, 5))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm)
        }
    }

    return (
        <nav className="fixed top-0 left-0 z-20 flex h-14 w-full items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3 text-white md:h-16 md:py-4 xl:px-50">
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

            {/* Enhanced Search Box */}
            <div className="relative mx-4 flex max-w-2xl min-w-0 flex-1">
                <div
                    ref={searchRef}
                    className="flex w-full items-center overflow-hidden rounded-3xl border border-gray-600 bg-gray-700 px-4 focus-within:border-white"
                >
                    <input
                        className="h-8 w-full bg-transparent text-sm text-white placeholder-gray-300 focus:outline-none sm:text-base"
                        type="text"
                        placeholder="Search products, categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleInputFocus}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={() => handleSearch(searchTerm)}
                        className="ml-2 cursor-pointer text-gray-300 hover:text-white"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && (
                    <div
                        ref={suggestionsRef}
                        className="absolute top-full right-0 left-0 z-30 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
                    >
                        {/* Recent Searches */}
                        {searchTerm.length === 0 &&
                            recentSearches.length > 0 && (
                                <div className="p-3">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                            <Clock className="h-4 w-4" />
                                            Recent searches
                                        </h3>
                                        <button
                                            onClick={clearRecentSearches}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                    {recentSearches.map((search, index) => (
                                        <div
                                            key={index}
                                            className="group flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-gray-50"
                                            onClick={() =>
                                                handleSuggestionClick(search)
                                            }
                                        >
                                            <span className="text-sm text-gray-700">
                                                {search}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeRecentSearch(search)
                                                }}
                                                className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {/* Popular Searches */}
                        {searchTerm.length === 0 &&
                            popularSearches.length > 0 && (
                                <div className="border-t border-gray-100 p-3">
                                    <h3 className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700">
                                        <TrendingUp className="h-4 w-4" />
                                        Popular searches
                                    </h3>
                                    {popularSearches
                                        .slice(0, 6)
                                        .map((search, index) => (
                                            <div
                                                key={index}
                                                className="cursor-pointer rounded px-2 py-1 hover:bg-gray-50"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        search
                                                    )
                                                }
                                            >
                                                <span className="text-sm text-gray-700">
                                                    {search}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            )}

                        {/* Search Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="p-3">
                                <h3 className="mb-2 text-sm font-medium text-gray-700">
                                    Suggestions
                                </h3>
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-gray-50"
                                        onClick={() =>
                                            handleSuggestionClick(
                                                suggestion.text
                                            )
                                        }
                                    >
                                        <span className="text-sm text-gray-700">
                                            {suggestion.text}
                                        </span>
                                        <span className="text-xs text-gray-400 capitalize">
                                            {suggestion.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No suggestions */}
                        {searchTerm.length >= 2 && suggestions.length === 0 && (
                            <div className="p-3 text-center text-sm text-gray-500">
                                No suggestions found
                            </div>
                        )}
                    </div>
                )}
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
