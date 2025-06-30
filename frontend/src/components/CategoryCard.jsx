export default function CategoryCard({ name, icon, image }) {
    return (
        <div className="relative h-48 w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-md transition-shadow duration-200 hover:shadow-lg">
            <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
                <div className="mb-1 text-white">{icon}</div>
                <p className="text-sm font-medium">{name}</p>
            </div>
        </div>
    )
}
