import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from  '../CartCotext';
import Header from "../component/Header";
import "../pagescss/Detail.css";

const Detail: React.FC = () => {
    const location = useLocation();
    const { product } = location.state || {}; // location.state에서 product를 가져옴
    const [count, setCount] = useState<number>(1);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // 수량 증가
    const plusClick = (): void => {
        setCount((prevCount) => prevCount + 1);
    };

    // 수량 감소
    const minusClick = (): void => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    };

    // 폼 제출 시 처리 (카트 페이지로 이동)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (product) {
            navigate('/box', {
                state: { product: { ...product, count } },
            });
        }
    };

    // 장바구니에 상품 추가
    const handleAddToCart = (): void => {
        if (product) {
            addToCart({ ...product, count });
            navigate('/box'); // 장바구니 페이지로 이동
        }
    };

    return (
        <>
            <Header />
            <div className="cap-container">
                <div className="product-img">
                    {product?.img && (
                        <img src={URL.createObjectURL(product.img)} alt="Product" />
                    )}
                </div>
                <div className="sale-content">
                    <form onSubmit={handleSubmit}>
                        <b>{product?.name}</b>
                        <p>Price: ${product?.price * count}</p>
                        <p>Delivery fee:</p>
                        <label htmlFor="color">Color</label>
                        <select id="color" name="color">
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="pink">Pink</option>
                        </select>
                        <div className="amount-btn">
                            <div className="amount">
                                <button type="button" onClick={plusClick}>+</button>
                                <p>{count}</p>
                                <button type="button" onClick={minusClick}>-</button>
                            </div>
                        </div>
                        <div className="sale-select">
                            <button type="submit">Cart</button>
                            <button type="button" onClick={handleAddToCart}>Add to Cart</button>
                            <a href="/box">Go to Cart</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Detail;
