export default function ItemCard(props) {
    return (
        <div className="h-55 min-w-44 rounded-xl bg-gray-100 shadow-sm">
            <h1>{props.id}</h1>
        </div>
    )
}
