import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : ''

export default function Verify() {
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({
        m1: '',
        m2: '',
    })

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        if (!token) {
            setMessage({ m1: 'Invalid verification link.' })
            setLoading(false)
            return
        }
        axios
            .post(`${API_URL}/api/login/verify`, { token: token })
            .then((res) => {
                if (res.data.msg == 'success') {
                    setMessage({
                        m1: 'New account created successfully.',
                        m2: 'Please Sign In with your new account.',
                    })
                }
                setLoading(false)
            })
            .catch((error) => {
                setMessage({ m1: 'Error Occured!' })
                setLoading(false)
                console.error(error)
            })
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            {loading ? (
                <div className="h-16 w-16 animate-spin rounded-full border-5 border-gray-200 border-t-gray-700"></div>
            ) : (
                <p className="text-center text-2xl font-medium">
                    {message.m1}
                    <br />
                    {message.m2}
                </p>
            )}
        </div>
    )
}
