import './Item.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Item = () => {
    const location = useLocation();
    const { product } = location.state || {};  // Get product from location.state
    const navigate = useNavigate();  // Hook to navigate

    const moveClick = () => {
        if (product?.id) {
            navigate(`/detail/${product.id}`);  // Navigate to dynamic detail page
        } else {
            console.error("Product ID is missing");
        }
    };

    return (
        <>
            {product ? (
                <div className="item">
                    <div className="item-img">
                        {/* Handle image if it's a file object */}
                        {product.img ? (
                            <img 
                                src={typeof product.img === "string" ? product.img : URL.createObjectURL(product.img)} 
                                alt="ProductImage" 
                            />
                        ) : (
                            <p>No Image Available</p>  // Fallback if no image is available
                        )}
                    </div>
                    <div className="item-tag">
                        <p>{product.name}</p>
                        <h2>{product.price}</h2>
                        <button type="button" onClick={moveClick}>Buy</button>
                    </div>
                </div>
            ) : (
                <p>No product available at the moment. Please try again later.</p>  // More descriptive fallback
            )}
        </>
    );
};

export default Item;
