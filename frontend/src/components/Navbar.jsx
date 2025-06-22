import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
                if (res.data.success) {
                    setLogin(true)
                } else {
                    setLogin(false)
                }
            })
            .catch((err) => console.error(err))
    }, [])

    function logout() {
        console.log('logout clicked')
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
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                {login && <button onClick={logout}>Logout</button>}
            </ul>
        </nav>
    )
}
