import { useState } from "react";
import NavBar from "./Navbar";
import ProductGrid from "./ProductGrid";

function SearchResutlPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <>
      <NavBar onSearchResults={setFilteredProducts} />
      <hr className="mt-4 border-t border-gray-200 " />
      <ProductGrid products={filteredProducts} />
    </>
  );
}

export default SearchResutlPage;
