import { useParams } from "react-router-dom";
import items from "./itemsSample"; 

export default function ProductDetail() {
    const { id } = useParams(); 

    const product = items.find(p => p.id.toString() === id); 

    if (!product) {
        return <div className="p-4 text-red-600">Product not found</div>;
    }

    const { name, price, image, rating } = product;

    return (
        <div>
            <div>
                <img src={image}></img>
            </div>
            <div>
                <div>
                    <h2>{name}</h2>
                <p>Rs. {price}</p>
                <p>⭐{rating}</p>
                </div>

                <div>
                    Product Specifiaction
                </div>

                <div>
                    Seller Information
                </div>
            </div>
            
        </div>
    );
}
