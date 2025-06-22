import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : ''

export default function Verify() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        if (!token) {
            setMessage('Invalid verification link.')
            setLoading(false)
            return
        }
        axios
            .post(
                `${API_URL}/api/login/verify`,
                { token: token },
                { withCredentials: true }
            )
            .then((res) => {
                setMessage(res.data.msg)
                if (res.data.success) {
                    setTimeout(() => navigate('/'), 3000)
                } else {
                    setLoading(false)
                }
            })
            .catch((error) => {
                setMessage('Error Occured!')
                setLoading(false)
                console.error(error)
            })
    }, [])

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-white">
            {loading && (
                <div className="mb-6 h-20 w-20 animate-spin rounded-full border-5 border-gray-200 border-t-gray-500"></div>
            )}

            <p className="text-center text-2xl font-medium text-gray-700">
                {message}
            </p>
        </div>
    )
}
