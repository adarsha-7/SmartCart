import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, TrendingUp, Eye, Award, Users } from "lucide-react";

export default function ProductGrid({ products, showSearchFeatures = false }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // Get unique categories from products
  const categories = [...new Set(
    products.flatMap(product => 
      product.categories?.map(cat => cat.name) || []
    )
  )];

  // Function to filter products by selected price range
  const filterByPriceRange = (product) => {
    if (!selectedPriceRange || selectedPriceRange === "Price Range") {
      return true;
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
      case "Rs.400+":
        return price > 400;
      default:
        return true;
    }
  };

  // Function to filter products by category
  const filterByCategory = (product) => {
    if (!selectedCategory || selectedCategory === "All Categories") {
      return true;
    }
    return product.categories?.some(cat => cat.name === selectedCategory);
  };

  // Function to sort products
  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "popularity":
        return [...products].sort((a, b) => (b.quantitySold || 0) - (a.quantitySold || 0));
      case "newest":
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "relevance":
      default:
        if (showSearchFeatures) {
          return [...products].sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
        }
        return products;
    }
  };

  // Apply filters and sorting
  const filteredProducts = sortProducts(
    products
      .filter(filterByPriceRange)
      .filter(filterByCategory)
  );

  // Render product badges
  const renderBadges = (product) => {
    if (!showSearchFeatures || !product.badges) return null;

    return (
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.badges.trending && (
          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
            <TrendingUp className="h-3 w-3" />
            Trending
          </span>
        )}
        {product.badges.featured && (
          <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
            <Eye className="h-3 w-3" />
            Featured
          </span>
        )}
        {product.badges.highRated && (
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
            <Award className="h-3 w-3" />
            Top Rated
          </span>
        )}
        {product.badges.popular && (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
            <Users className="h-3 w-3" />
            Popular
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <>
          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <select
                className="border rounded px-4 py-2 text-sm w-full sm:w-auto"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">Price Range</option>
                <option value="Rs.0 - Rs.100">Rs.0 - Rs.100</option>
                <option value="Rs.100 - Rs.200">Rs.100 - Rs.200</option>
                <option value="Rs.200 - Rs.300">Rs.200 - Rs.300</option>
                <option value="Rs.300 - Rs.400">Rs.300 - Rs.400</option>
                <option value="Rs.400+">Rs.400+</option>
              </select>

              {categories.length > 0 && (
                <select
                  className="border rounded px-4 py-2 text-sm w-full sm:w-auto"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                className="border rounded px-4 py-2 text-sm w-full sm:w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {showSearchFeatures && <option value="relevance">Most Relevant</option>}
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest First</option>
              </select>

              <span className="text-sm text-gray-600 whitespace-nowrap">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id || index}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] bg-white relative">
                  {/* Product Badges */}
                  {renderBadges(product)}

                  {/* Product Image */}
                  <div className="w-full h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={product.imageURL || product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Search Score (if available) */}
                    {showSearchFeatures && product.searchScore && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {Math.round(product.searchScore * 100)}% match
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h2 className="font-semibold text-sm mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h2>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-900 font-bold text-lg">
                        Rs.{product.price}
                      </p>
                      
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {product.description && (
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Categories */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.categories.slice(0, 2).map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Seller Info */}
                    {product.user && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        {product.user.image ? (
                          <img
                            src={product.user.image}
                            alt="Seller"
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-gray-300" />
                        )}
                        <span className="text-xs text-gray-500">
                          {product.user.first_name} {product.user.last_name}
                        </span>
                      </div>
                    )}

                    {/* Sales info */}
                    {product.quantitySold > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        {product.quantitySold} sold
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button (if needed) */}
          {products.length >= 20 && (
            <div className="text-center mt-8">
              <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
                Load More Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}