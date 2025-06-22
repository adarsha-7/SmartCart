import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShoppingBasket, WandSparkles, Wallet } from 'lucide-react'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function Login() {
    const navigate = useNavigate()

    const [loginType, setLoginType] = useState('signIn')
    const [userMessage, setUserMessage] = useState({
        message: '',
        color: '',
    })

    function login(formData) {
        const email = formData.get('email')
        const password = formData.get('password')

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            setUserMessage({
                message: 'Please enter a valid email address.',
                color: 'red-600',
            })
        } else if (password.length < 8) {
            setUserMessage({
                message: 'Password should be at least 8 characters long.',
                color: 'red-600',
            })
        } else {
            const data = {
                email: email,
                password: password,
            }

            if (loginType == 'signUp') {
                axios
                    .post(`${API_URL}/api/login/signup`, data)
                    .then((res) => {
                        setUserMessage((prev) => {
                            return { ...prev, message: res.data.msg }
                        })
                    })
                    .catch((error) => {
                        setUserMessage((prev) => {
                            return { ...prev, message: 'Error occured!' }
                        })
                        console.error(error)
                    })
            } else {
                axios
                    .post(`${API_URL}/api/login/signin`, data, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        if (res.data.success) {
                            navigate('/login/loading-page')
                        } else {
                            setUserMessage((prev) => {
                                return { ...prev, message: res.data.msg }
                            })
                        }
                    })
                    .catch((error) => {
                        setUserMessage((prev) => {
                            return { ...prev, message: 'Error occured!' }
                        })
                        console.error(error)
                    })
            }
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/api/auth/google`
    }

    return (
        <main className="flex h-screen items-center">
            <section className="hidden h-full w-1/2 flex-col items-start justify-start bg-gray-200 px-12 py-8 lg:flex">
                <div className="flex items-center gap-4">
                    <img
                        src="/icons/logo.png"
                        alt="Logo"
                        className="h-10 w-12"
                    />
                    <span className="text-2xl font-bold">SmartCart</span>
                </div>
                <span className="text-md text-medium my-3 text-gray-700">
                    Shop quick, Shop smart
                </span>
                <img
                    src="/images/loginpage_photo.jpg"
                    alt="Resume"
                    className="mt-5 mb-10 h-[400px] w-full rounded-lg object-cover object-center shadow-sm"
                />
                <div className="font-md flex h-full w-full flex-col justify-between gap-8">
                    <div className="bg-background flex h-1/3 items-center gap-5 rounded-xl p-5 shadow-sm">
                        <ShoppingBasket className="h-7 w-7" />
                        <div className="flex flex-col">
                            <h3 className="font-semibold">
                                All kinds of products
                            </h3>
                            <span className="font-normal text-gray-500">
                                Choose from thousands of products from different
                                category, brand-new or second-hand.
                            </span>
                        </div>
                    </div>

                    <div className="bg-background flex h-1/3 items-center gap-5 rounded-xl p-5 shadow-sm">
                        <WandSparkles className="h-7 w-7" />
                        <div className="flex flex-col">
                            <h3 className="font-semibold">Use AI for search</h3>
                            <span className="font-normal text-gray-500">
                                AI helps you find exactly what you are looking
                                for using your decription.
                            </span>
                        </div>
                    </div>

                    <div className="bg-background flex h-1/3 items-center gap-5 rounded-xl p-5 shadow-sm">
                        <Wallet className="h-7 w-7" />
                        <div className="flex flex-col">
                            <h3 className="font-semibold">Easy purchase</h3>
                            <span className="font-normal text-gray-500">
                                Every step is simple and fun, from browsing your
                                desired product to payment.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex h-full w-full items-center justify-center lg:w-1/2">
                <form
                    action={login}
                    className="flex w-[60%] flex-col items-center justify-center md:w-[50%] lg:w-[60%] xl:w-[50%]"
                >
                    <h1 className="mb-2 text-center text-3xl font-bold">
                        Welcome to SmartCart
                    </h1>
                    <span className="text-md text-center font-normal text-gray-600">
                        Sign in and start shopping
                    </span>
                    <div className="space m-5 flex w-full justify-center font-medium text-gray-500">
                        <button
                            type="button"
                            onClick={() => setLoginType('signIn')}
                            className={`flex-1 cursor-pointer p-5 ${loginType == 'signIn' ? 'text-font border-b-2 border-gray-800' : 'border-b-1 border-gray-300'}`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginType('signUp')}
                            className={`flex-1 cursor-pointer p-5 ${loginType == 'signUp' ? 'text-font border-b-2 border-gray-800' : 'border-b-1 border-gray-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="m-5 flex w-full flex-col justify-start text-[15px] font-medium">
                        <label htmlFor="email" className="mb-3">
                            Email address
                        </label>
                        <input
                            id="email"
                            className="h-12 rounded-md border-1 border-gray-300 p-3 font-normal outline-none"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <br />
                        <label htmlFor="password" className="mb-3">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="h-12 rounded-md border-1 border-gray-300 p-3 font-normal outline-none"
                            placeholder="Enter your password"
                            required
                        />
                        <a
                            href=""
                            className="mt-3 self-end text-xs font-medium"
                        >
                            {loginType == 'signIn' ? 'Forgot Password?' : ''}
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="text-background h-12 w-full cursor-pointer rounded-md bg-gray-800 transition-colors duration-300 hover:bg-gray-900"
                    >
                        {loginType == 'signIn' ? 'Sign In' : 'Sign Up'}
                    </button>
                    <div className="m-5 flex w-full items-center">
                        <div className="w-full flex-1/4 border-1 border-gray-300"></div>
                        <span className="mx-3 text-sm text-gray-500">
                            Or continue with
                        </span>
                        <div className="w-full flex-1/4 border-1 border-gray-300"></div>
                    </div>
                    <button
                        type="button"
                        className="mb-3 flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-md border-1 border-gray-300 font-medium transition-colors duration-300 hover:bg-gray-200"
                        onClick={handleGoogleLogin}
                    >
                        <img
                            src="https://crystalpng.com/wp-content/uploads/2025/05/google-logo.png"
                            alt="Google"
                            className="h-6 w-6"
                        />
                        Continue with Google
                    </button>
                    <span
                        className={`mt-5 text-center text-sm font-normal text-red-600`}
                    >
                        {userMessage.message}
                    </span>
                </form>
            </section>
        </main>
    )
}
