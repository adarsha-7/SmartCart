import { Upload, X, Camera } from 'lucide-react'
import { useState } from 'react'

export default function NewProductForm() {
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
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must be 100 characters or less'
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

    const handleSubmit = (isDraft = false) => {
        if (!validateForm() && !isDraft) return

        const actionType = isDraft ? 'draft' : 'publish'
        console.log(`${actionType} listing:`, formData)

        // Here you would typically send data to your backend
        alert(
            `Listing ${isDraft ? 'saved as draft' : 'published'} successfully!`
        )
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
                            Fill in the details to list your second-hand item
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
                                /100 characters)
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
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                                <option value="sports">
                                    Sports & Outdoors
                                </option>
                                <option value="other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-2 left-3 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
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
                                defects
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

                <div className="mt-8">
                    <div className="mb-5 text-xl font-semibold">
                        Preview Your Listing
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 block text-sm font-medium text-gray-900">
                            Preview
                        </p>
                        <p className="mb-8 text-xs text-gray-500">
                            This is how your listing will appear to buyers
                        </p>

                        {/* Preview Image */}
                        <div className="mb-4 flex h-60 items-center justify-center rounded-lg">
                            {previewImages.length > 0 ? (
                                <img
                                    src={previewImages[0].preview}
                                    alt="Preview"
                                    className="w-half h-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Camera className="mb-2 h-8 w-8 text-gray-400" />
                                    <p className="text-xs text-gray-500">
                                        Upload images to preview
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-gray-900">
                                {formData.title || 'Item Title'}
                            </p>
                            <p className="text-sm text-gray-600">
                                {formData.description ||
                                    'Description Preview...'}
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-gray-900">
                                    ${formData.price || '0.00'}
                                </p>
                                {formData.condition && (
                                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                                        {formData.condition}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3.5">
                    <button
                        onClick={() => handleSubmit(true)}
                        className="cursor-pointer rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                    >
                        Save as Draft
                    </button>
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
