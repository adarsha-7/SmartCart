import "../CSS/productcard.css"
function ProductCard({product}){

    function onAddtoCartClick(){
        alert("added to cart");
    }

    return(
        <div className="product-card">
            <div className="product-picture">
                <img src={product.img}></img>
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p style={{fontSize:"10px"}}>⭐⭐⭐⭐⭐</p>
            </div>

            <div className="product-buy">
                <p>{product.price}</p>
                <button className="cart-button" onClick={onAddtoCartClick}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;