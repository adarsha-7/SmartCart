import { Upload, X, Camera } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { categories, subcategories } from '../data/categories'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function NewProductForm() {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios
            .get(`${API_URL}/api/auth/authentication-test`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                console.log(res.data) /////////
            })
            .catch((err) => console.error(err))
    }, [])

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        condition: '',
        description: '',
        images: [],
    })

    const [previewImages, setPreviewImages] = useState([])
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)

        if (files.length + previewImages.length > 5) {
            alert('Maximum 5 images allowed')
            return
        }

        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    file: file,
                    preview: e.target.result,
                }
                setPreviewImages((prev) => [...prev, newImage])
            }
            reader.readAsDataURL(file)
        })

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }))
    }

    const removeImage = (imageId) => {
        setPreviewImages((prev) => prev.filter((img) => img.id !== imageId))
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== imageId),
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
        } else if (formData.title.length > 150) {
            newErrors.title = 'Title must be 150 characters or less'
        }

        if (!formData.category) {
            newErrors.category = 'Category is required'
        }

        if (!formData.price) {
            newErrors.price = 'Price is required'
        } else if (parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be greater than 0'
        }

        if (!formData.condition) {
            newErrors.condition = 'Condition is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        const form = new FormData() // Create a FormData object

        // Append all non-file fields
        form.append('title', formData.title)
        form.append('category', formData.category)
        form.append('subCategory', formData.subCategory)
        form.append('price', formData.price)
        form.append('condition', formData.condition)
        form.append('description', formData.description)

        // Append each image file individually
        formData.images.forEach((image) => {
            form.append('images', image) // 'images' is treated as an array by the backend
        })

        axios
            .post(`${API_URL}/api/product/add-product`, form, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data.msg)
                alert('Listing Published successfully!')
            })
            .catch((error) => {
                console.error(error)
                alert('Error Occurred! Could not publish listing.')
            })
    }

    return (
        <>
            <div className="mx-auto mt-[90px] max-w-2xl px-6 py-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-8">
                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                            List Your Item
                        </h2>
                        <p className="text-gray-400">
                            Fill in the details to list your item
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Item title{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter item title"
                                className={`w-full rounded-md border px-3 py-2 ${
                                    errors.title
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                maxLength={100}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-gray-400">
                                Be specific and concise ({formData.title.length}
                                /150 characters)
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`w-full appearance-none rounded-md border bg-white px-3 py-2 ${
                                    errors.category
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            >
                                <option value="0">Other</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Subcategory{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                className={`w-full appearance-none rounded-md border bg-white px-3 py-2 ${
                                    errors.subCategory
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                disabled={
                                    formData.category === '' ||
                                    formData.category === '0'
                                }
                            >
                                <option value="0">Other</option>
                                {formData.category !== '0' &&
                                    subcategories
                                        .filter((sub) => {
                                            const categoryName =
                                                categories.find(
                                                    (cat) =>
                                                        String(cat.id) ===
                                                        String(
                                                            formData.category
                                                        )
                                                )?.name
                                            return sub.category === categoryName
                                        })
                                        .map((sub) => (
                                            <option key={sub.id} value={sub.id}>
                                                {sub.name}
                                            </option>
                                        ))}
                            </select>
                            {errors.subCategory && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.subCategory}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-2 left-3 text-gray-500">
                                    Rs
                                </span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="10"
                                    min="0"
                                    className={`w-full rounded-md border py-2 pr-3 pl-8 ${
                                        errors.price
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.price}
                                </p>
                            )}
                            <div className="mt-1 flex flex-row text-xs text-gray-400">
                                <p className="mr-1 flex h-[14px] w-[14px] items-center justify-center rounded-full border">
                                    !
                                </p>
                                <p>Set a competitive price</p>
                            </div>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-900">
                                Item Condition{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                {[
                                    'Brand New',
                                    'Like New',
                                    'Very Good',
                                    'Good',
                                    'Fair',
                                    'Poor',
                                ].map((condition) => (
                                    <div
                                        key={condition}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            id={condition}
                                            name="condition"
                                            value={condition}
                                            checked={
                                                formData.condition === condition
                                            }
                                            onChange={handleInputChange}
                                            className="mr-3 text-blue-600"
                                        />
                                        <label
                                            htmlFor={condition}
                                            className="cursor-pointer text-sm text-gray-700"
                                        >
                                            {condition}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.condition && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.condition}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Description{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your item..."
                                rows={5}
                                maxLength={1000}
                                className={`w-full resize-none rounded-md border px-3 py-2 ${
                                    errors.description
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.description}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Describe the item's features, history, and any
                                defects ({formData.description.length}
                                /1000 characters)
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Product Images
                            </label>

                            {/* Image Upload Area */}
                            <div className="rounded-lg border border-dashed border-gray-400 p-8 text-center">
                                <Upload className="mx-auto mb-4 h-8 w-8 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-600">
                                    Drag & drop images or click to upload
                                </p>
                                <p className="mb-4 text-xs text-gray-500">
                                    Maximum 5 images allowed (
                                    {previewImages.length}/5)
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Choose Files
                                </label>
                            </div>

                            {/* Image Preview */}
                            {previewImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {previewImages.map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative"
                                        >
                                            <img
                                                src={image.preview}
                                                alt="Preview"
                                                className="h-24 w-full rounded-md border object-cover"
                                            />
                                            <button
                                                onClick={() =>
                                                    removeImage(image.id)
                                                }
                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="mt-8 text-gray-400" />

                <div className="mt-8 flex justify-end space-x-3.5">
                    <button
                        onClick={() => handleSubmit(false)}
                        className="cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-2 text-white hover:bg-gray-900"
                    >
                        Publish Listing
                    </button>
                </div>
            </div>
        </>
    )
}
