import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV == 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

function UserProfile() {
    const [user, setUser] = useState({})
    const [editingField, setEditingField] = useState(null)
    const [editedUser, setEditedUser] = useState({})
    const [isSaving, setIsSaving] = useState(false)

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

    const handleSave = async () => {
        setIsSaving(true)

        try {
            const userData = {
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                email: editedUser.email,
                phone_number: editedUser.phone_number,
                address: editedUser.address,
            }

            const response = await axios.patch(
                `${API_URL}/api/user/profile`,
                userData,
                {
                    withCredentials: true,
                }
            )

            setUser(editedUser)
            setEditingField(null)

            console.log('Profile updated successfully')
        } catch (error) {
            console.error('Error saving profile:', error)
        } finally {
            setIsSaving(false)
        }
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
                        disabled={isSaving}
                    />
                ) : (
                    <p className="text-gray-500">{user[field]}</p>
                )}
            </div>
            <button
                className={`text-gray-500 ${isSaving ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() =>
                    editingField === field ? handleSave() : handleEdit(field)
                }
                disabled={isSaving}
            >
                <i
                    className={`fa-solid ${editingField === field ? (isSaving ? 'fa-spinner fa-spin' : 'fa-check') : 'fa-pen'} mr-1`}
                ></i>
                {editingField === field
                    ? isSaving
                        ? 'Saving...'
                        : 'Save'
                    : 'Edit'}
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
                    <div className="mt-10">
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
