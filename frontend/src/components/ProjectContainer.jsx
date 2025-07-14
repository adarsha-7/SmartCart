import cartItems from "../utils/productinfo";
import OrderCalc from "./OrderCalculator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProductContainer() {
  const [items, setItems] = useState(cartItems);

  function addQuantity(index) {
    const updatedCart = items.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedCart);
  }

  function decreaseQuantity(index) {
    const updatedCart = items.map((item, i) => {
      if (i === index) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }

      return item;
    });
    setItems(updatedCart);
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <>
      {items.length === 0 ? (
        <div className="ml-[50px] mt-[20px] text-lg text-gray-500">
          There are no items in your cart.
        </div>
      ) : (
        <>
          <div className="mt-[40px] ml-[50px]">
            <h1 className="font-semibold text-4xl ">Shopping Cart</h1>
            <div>
              <p>{items.length} Items</p>
            </div>
          </div>
          <div className="border border-gray-200 w-[800px]  top-[140px] left-[50px] rounded-t-sm border-b-0 ml-[50px] mt-[39px]">
            <div className="flex bg-gray-100 h-10 items-center  font-bold rounded-t-sm border-b border-gray-200">
              <div className="w-[360px] ml-[10px] ">Product</div>
              <div className="w-[100px] flex justify-center">Price</div>
              <div className="w-[150px]  flex justify-center">Quantity</div>
              <div className="w-[125px]  flex justify-center ">Total</div>
            </div>
            <div className="max-h-[452px] overflow-y-auto">
              {items.map((item, index) => (
                <div className=" flex border-b border-gray-200 p-2">
                  <div className="flex w-[360px] ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover border border-gray-50"
                    />
                    <div className="ml-2">
                      <h2 className="text-lg ">{item.name}</h2>
                      <p className="text-sm font-light text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <p className=" w-[100px] flex justify-center items-center">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex justify-center items-center w-[150px]">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center border border-gray-300 rounded-lg ml-2">
                        <button
                          onClick={() => decreaseQuantity(index)}
                          className="p-1 hover:bg-gray-50 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center font-medium border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addQuantity(index)}
                          className="p-1 hover:bg-gray-50 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[125px] flex justify-center items-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className=" flex justify-center items-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <OrderCalc items={items} />
        </>
      )}
    </>
  );
}
