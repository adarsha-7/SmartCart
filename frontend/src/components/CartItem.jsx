import { Minus, Plus, Trash2 } from 'lucide-react'
import axios from 'axios'

const API_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL

export default function CartItem({
    image,
    name,
    description,
    price,
    quantity,
    id,
    items,
    setItems,
    userID,
    isLast,
}) {
    function addQuantity() {
        const updatedCart = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setItems(updatedCart)
        axios
            .patch(
                `${API_URL}/api/product/cart-item/increase?userID=${userID}&itemID=${id}`
            )
            .catch((error) => console.error(error))
    }

    function decreaseQuantity() {
        const updatedCart = items.map((item) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                }
            }
            return item
        })
        setItems(updatedCart)

        if (quantity > 1) {
            axios
                .patch(
                    `${API_URL}/api/product/cart-item/decrease?userID=${userID}&itemID=${id}`
                )
                .catch((error) => console.error(error))
        }
    }

    function removeItem() {
        setItems(items.filter((item) => item.id !== id))

        axios
            .delete(
                `${API_URL}/api/product/cart-item/delete?userID=${userID}&itemID=${id}`
            )
            .catch((error) => console.error(error))
    }

    return (
        <div
            className={`flex px-2 py-1 ${
                isLast ? '' : 'border-b border-gray-200'
            }`}
        >
            <div className="flex w-[360px]">
                <img
                    src={image}
                    alt={name}
                    className="h-24 w-24 border border-gray-50 object-cover"
                />
                <div className="ml-2">
                    <h2 className="text-lg">{name}</h2>
                    <p className="text-sm font-light text-gray-600">
                        {description}
                    </p>
                </div>
            </div>
            <p className="flex w-[100px] items-center justify-center">
                Rs. {price.toFixed(2)}
            </p>
            <div className="flex w-[150px] items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                    <div className="ml-2 flex items-center rounded-lg border border-gray-300">
                        <button
                            onClick={decreaseQuantity}
                            className="rounded-l-lg p-1 transition-colors hover:bg-gray-50"
                        >
                            <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="min-w-[40px] border-r border-l border-gray-300 px-3 py-1 text-center font-medium">
                            {quantity}
                        </span>
                        <button
                            onClick={addQuantity}
                            className="rounded-r-lg p-1 transition-colors hover:bg-gray-50"
                        >
                            <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex w-[125px] items-center justify-center">
                Rs. {(price * quantity).toFixed(2)}
            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={removeItem}
                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
