import * as Icons from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CategoryCard({ name, icon, image }) {
    const IconComponent = Icons[icon] || Icons.HelpCircle

    return (
        <Link
            to={`/search?q=${encodeURIComponent(name)}`}
            className="relative h-55 w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-110"
        >
            <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
                <IconComponent size={24} className="mb-1 text-white" />
                <p className="text-sm font-medium">{name}</p>
            </div>
        </Link>
    )
}
