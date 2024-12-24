import { useState } from "react";
import Header from "../component/Header";
import "../pagescss/Box.css";
import { useLocation } from "react-router-dom";

// product의 타입을 명확히 정의합니다.
interface Product {
  no: string; // 상품 고유 번호
  img: File | string | null; // 이미지 파일 또는 URL
  name: string; // 상품 이름
  price: number; // 상품 가격
  count: number; // 상품 수량
}

const Box = () => {
  const [show, setShow] = useState<boolean>(true);
  const location = useLocation();
  const { product } = location.state || {}; // 타입이 undefined일 수 있는 product 상태 처리
  const [boxList, setBoxList] = useState<Product[]>([]); // Cart list state
  const [loveList, setLoveList] = useState<Product[]>([]); // Love list state

  const showBoxList = () => {
    setShow(true);
  };

  const showLoveList = () => {
    setShow(false);
  };

  // Add product to cart (Box List)
  const addToBoxList = () => {
    if (product) {
      const productExists = boxList.some((item) => item.no === product.no);
      if (!productExists) {
        setBoxList((prevBoxList) => [...prevBoxList, { ...product, count: 1 }]);
      }
    }
  };

  // Add product to love list
  const addToLoveList = () => {
    if (product) {
      const productExists = loveList.some((item) => item.no === product.no);
      if (!productExists) {
        setLoveList((prevLoveList) => [...prevLoveList, { ...product, count: 1 }]);
      }
    }
  };

  // Delete product from cart or love list
  const deleteProduct = (id: string, list: string) => {
    if (list === "box") {
      setBoxList((prevBoxList) => prevBoxList.filter((item) => item.no !== id));
    } else if (list === "love") {
      setLoveList((prevLoveList) => prevLoveList.filter((item) => item.no !== id));
    }
  };

  // Handle amount change
  const handleAmountChange = (id: string, list: string, amount: number) => {
    if (list === "box") {
      setBoxList((prevBoxList) =>
        prevBoxList.map((item) =>
          item.no === id ? { ...item, count: amount } : item
        )
      );
    } else if (list === "love") {
      setLoveList((prevLoveList) =>
        prevLoveList.map((item) =>
          item.no === id ? { ...item, count: amount } : item
        )
      );
    }
  };

  return (
    <>
      <Header />
      <div className="box-cart">
        <div className="title">Box-Cart</div>
        <div className="box-container">
          <ul className="box-selector">
            <li className={show ? "tab-active" : "active"}>
              <a href="#none" onClick={showBoxList}>
                BoxList
              </a>
            </li>
            <li className={!show ? "tab-active" : "active"}>
              <a href="#none" onClick={showLoveList}>
                LoveList
              </a>
            </li>
          </ul>

          {/* Render BoxList Table */}
          {show && (
            <table>
              <thead>
                <tr>
                  <th scope="col">Check</th>
                  <th scope="col">Img</th>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {boxList.length > 0 ? (
                  boxList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        {item.img && (
                          <img src={typeof item.img === "string" ? item.img : URL.createObjectURL(item.img)} alt="Product" />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          type="number"
                          value={item.count}
                          onChange={(e) => handleAmountChange(item.no, "box", +e.target.value)}
                          min="1"
                        />
                      </td>
                      <td>{item.price * item.count}</td>
                      <td>
                        <button type="button" onClick={() => deleteProduct(item.no, "box")}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No products in cart</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* Render LoveList Table */}
          {!show && (
            <table>
              <thead>
                <tr>
                  <th scope="col">Check</th>
                  <th scope="col">Img</th>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {loveList.length > 0 ? (
                  loveList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        {item.img && (
                          <img src={typeof item.img === "string" ? item.img : URL.createObjectURL(item.img)} alt="Product" />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          type="number"
                          value={item.count}
                          onChange={(e) => handleAmountChange(item.no, "love", +e.target.value)}
                          min="1"
                        />
                      </td>
                      <td>{item.price * item.count}</td>
                      <td>
                        <button type="button" onClick={() => deleteProduct(item.no, "love")}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No products in love list</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add To Love List and Box List Buttons */}
      <button type="button" onClick={addToBoxList}>Add to Box List</button>
      <button type="button" onClick={addToLoveList}>Add to Love List</button>
    </>
  );
};

export default Box;
