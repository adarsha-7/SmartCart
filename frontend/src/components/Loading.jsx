import { useNavigate } from 'react-router-dom'

export default function Loading() {
    const navigate = useNavigate()

    setTimeout(() => navigate('/'), 3000)

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-white">
            <div className="mb-6 h-20 w-20 animate-spin rounded-full border-5 border-gray-200 border-t-gray-500"></div>
            <p className="text-center text-2xl font-medium text-gray-700">
                Login Successful. Redirecting to Dashboard ...
            </p>
        </div>
    )
}
