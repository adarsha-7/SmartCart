import ProductCont from "../pages/ProjectContainer";

export default function OrderCalc({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal > 0 ? subtotal * 0.02 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return (
    <>
      <div className="w-[400px] h-auto border border-gray-200 rounded-2xl fixed right-[20px] top-[140px]">
        <div className="p-3">
          <h2 className="text-2xl font-semibold pb-4">Order Summary</h2>
          <div className="flex justify-between">
            <span className="pb-3 text-gray-400">Subtotal</span>
            <span className="">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="pb-3 text-gray-400">Shipping</span>
            <span className="">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="pb-3 text-gray-400">Tax</span>
            <span className="">${tax.toFixed(2)}</span>
          </div>
        </div>
        <hr className="w-5/6 ml-5 border-t border-gray-200 pb-6" />
        <div className="p-3">
          <div className="flex justify-between font-bold text-[20px]">
            <span className="pb-3">Total</span>
            <span className="">${total.toFixed(2)}</span>
          </div>
          <div className="bg-black text-white h-12 flex justify-center items-center rounded-2xl">
            Proceed to Checkout
          </div>
        </div>
      </div>
    </>
  );
}
