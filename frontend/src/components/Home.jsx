import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : ''

export default function Home() {
    const [message, setMessage] = useState({})

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.msg == 'Access token refreshed') {
                    axios
                        .get(`${API_URL}/api/auth/authentication-test`, {
                            withCredentials: true,
                        })
                        .then((res) => setMessage(res.data))
                        .catch((err) => console.error(err))
                } else {
                    setMessage(res.data)
                }
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <>
            <Navbar />
            <h1 className="text-3xl text-slate-800">This is Home page</h1>
            <h1 className="text-2xl text-slate-800">
                {message.msg || 'Message loading...'}
            </h1>
            {message.data && (
                <h1 className="text-md text-slate-800">
                    {message.data.first_name} <br />
                    {message.data.last_name} <br />
                    {message.data.email} <br />
                </h1>
            )}
        </>
    )
}
