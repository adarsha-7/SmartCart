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
                if (res.data.success) {
                    setMessage(
                        'New account created successfully. Redirecting to dashboard ...'
                    )
                }
                setTimeout(() => navigate('/'), 3000)
            })
            .catch((error) => {
                setMessage('Error Occured!')
                setLoading(false)
                console.error(error)
            })
    }, [])

    return (
        <div className="flex h-screen items-center justify-center gap-3">
            {loading && (
                <div className="h-16 w-16 animate-spin rounded-full border-5 border-gray-200 border-t-gray-700"></div>
            )}

            <p className="text-center text-2xl font-medium">{message}</p>
        </div>
    )
}
