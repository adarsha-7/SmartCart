export default function OrderCalculator({ items }) {
    const subtotal = items.reduce(
        (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
        0
    )

    const shipping = subtotal > 0 ? subtotal * 0.02 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax
    return (
        <>
            <div className="top-[140px] right-[20px] h-auto w-[400px] rounded-2xl border border-gray-200">
                <div className="p-3">
                    <h2 className="pb-4 text-2xl font-semibold">
                        Order Summary
                    </h2>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Subtotal</span>
                        <span className="">Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Shipping</span>
                        <span className="">Rs. {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="pb-3 text-gray-400">Tax</span>
                        <span className="">Rs. {tax.toFixed(2)}</span>
                    </div>
                </div>
                <hr className="ml-5 w-5/6 border-t border-gray-200 pb-6" />
                <div className="p-3">
                    <div className="flex justify-between text-[20px] font-bold">
                        <span className="pb-3">Total</span>
                        <span className="">Rs. {total.toFixed(2)}</span>
                    </div>
                    <div className="flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800 text-white hover:bg-gray-900">
                        Proceed to Checkout
                    </div>
                </div>
            </div>
        </>
    )
}
