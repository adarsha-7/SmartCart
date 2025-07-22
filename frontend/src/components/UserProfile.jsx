import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

function UserProfile() {
    const [user, setUser] = useState({})
    const [editingField, setEditingField] = useState(null)
    const [editedUser, setEditedUser] = useState({})

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                setEditedUser(res.data.user)
            })
            .catch((err) => console.error(err))
    }, [])

    const handleEdit = (field) => {
        setEditingField(field)
    }

    const handleSave = () => {
        // Implement saving logic here
        setUser(editedUser)
        setEditingField(null)
    }

    const handleChange = (field, value) => {
        setEditedUser((prev) => ({ ...prev, [field]: value }))
    }

    const renderField = (label, field) => (
        <div className="m-3 flex w-3xl items-center justify-between rounded-2xl bg-white p-5 shadow-md">
            <div className="flex flex-col justify-between">
                <p className="font-bold text-gray-600">{label}</p>
                {editingField === field ? (
                    <input
                        type="text"
                        value={editedUser[field] || ''}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="mt-1 rounded border border-gray-300 p-1 text-gray-700 focus:outline-none"
                    />
                ) : (
                    <p className="text-gray-500">{user[field]}</p>
                )}
            </div>
            <button
                className="text-gray-500"
                onClick={() =>
                    editingField === field ? handleSave() : handleEdit(field)
                }
            >
                <i className="fa-solid fa-pen mr-1"></i>
                {editingField === field ? 'Save' : 'Edit'}
            </button>
        </div>
    )

    return (
        <>
            <Navbar />

            <div className="mt-10 flex flex-col items-center justify-center bg-gray-100 p-10">
                <div className="flex flex-col items-center justify-center">
                    <p className="m-2.5 text-3xl font-bold">
                        Profile Information
                    </p>
                    <p className="text-gray-500">
                        Manage your personal information
                    </p>
                    <div className="mt-10 h-30 w-30 overflow-hidden rounded-full">
                        <img
                            src={user.image}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>
                    <button className="mt-5 rounded-sm bg-gray-200 p-2 text-gray-500">
                        <i className="fa-solid fa-pen"></i> Edit Photo
                    </button>
                </div>

                {renderField('First Name', 'first_name')}
                {renderField('Last Name', 'last_name')}
                {renderField('Email Address', 'email')}
                {renderField('Phone Number', 'phone_number')}
                {renderField('Address', 'address')}
            </div>

            <Footer />
        </>
    )
}

export default UserProfile
