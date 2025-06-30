import { Star } from 'lucide-react'

export default function ItemCard({ id, name, rating, price, image }) {
    return (
        <div className="min-w-50 transform cursor-pointer rounded-md bg-white shadow-sm transition duration-300 hover:scale-101 hover:shadow-lg">
            <img
                src={image}
                alt={name}
                className="h-40 w-full rounded-t-lg object-contain"
            />
            <div className="flex flex-col gap-1 p-2">
                <h3 className="line-clamp-1 text-sm font-medium text-gray-800">
                    {name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-700">{rating}</span>
                </div>
                <p className="text-sm font-medium text-black">Rs. {price}</p>
            </div>
        </div>
    )
}
