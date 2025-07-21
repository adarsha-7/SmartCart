import { useState, useEffect } from "react";

export default function ProductGrid({ products }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  // Function to filter products by selected price range
  const filterByPriceRange = (product) => {
    if (!selectedPriceRange || selectedPriceRange === "Price Range") {
      return true; // no filter applied
    }

    const price = product.price;

    switch (selectedPriceRange) {
      case "Rs.0 - Rs.100":
        return price >= 0 && price <= 100;
      case "Rs.100 - Rs.200":
        return price >= 100 && price <= 200;
      case "Rs.200 - Rs.300":
        return price > 200 && price <= 300;
      case "Rs.300 - Rs.400":
        return price > 300 && price <= 400;
      default:
        return true;
    }
  };

  // Filter products based on price range
  const filteredProducts = products.filter(filterByPriceRange);

  return (
    <div className="p-8">
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No items to display.</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-6">
            <select
              className="border rounded px-4 py-2 text-sm w-full sm:w-auto"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option>Price Range</option>
              <option>Rs.0 - Rs.100</option>
              <option>Rs.100 - Rs.200</option>
              <option>Rs.200 - Rs.300</option>
              <option>Rs.300 - Rs.400</option>
            </select>

            {/* You can add similar filters for category or condition here */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                <div className="w-full h-48 bg-white flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-sm mb-1 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 font-medium text-sm">
                    Rs.{product.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
