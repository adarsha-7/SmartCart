import { useNavigate } from 'react-router-dom'

export default function Loading() {
    const navigate = useNavigate()

    setTimeout(() => navigate('/'), 3000)

    return (
        <div className="flex h-screen items-center justify-center gap-5">
            <div className="h-16 w-16 animate-spin rounded-full border-5 border-gray-200 border-t-gray-700"></div>
            <p className="text-center text-2xl font-medium">
                Login Successful. Redirecting to Dashboard ...
            </p>
        </div>
    )
}
