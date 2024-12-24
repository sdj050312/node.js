// CartCotext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Product 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  img: File | null;
  count: number;
}

// CartContext의 타입 정의
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

// CartContext 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// 로컬 스토리지에서 데이터를 읽어오는 함수
const readDataFromLocalStorage = () => {
  const savedData = localStorage.getItem('product'); // 'todos' 키 사용
  return savedData ? JSON.parse(savedData) : []; // 데이터가 없으면 빈 배열 반환
};

// CartProvider 컴포넌트
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 로컬 스토리지에서 장바구니 초기값 읽어오기
  const [cart, setCart] = useState<Product[]>(readDataFromLocalStorage);

  // 장바구니 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(cart));
  }, [cart]);

  // 장바구니에 상품 추가
 const addToCart = (product: Product) => {
  setCart((prevCart) => {
    // 동일한 상품이 이미 장바구니에 있는지 확인
    const productExists = prevCart.some((item) => item.id === product.id);
    if (productExists) {
      // 이미 존재하면 수량만 증가
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + product.count } : item
      );
    }
    // 존재하지 않으면 새로 추가
    return [...prevCart, { ...product }];
  });
};

  // 장바구니에서 상품 삭제
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// useCart 훅을 사용하여 context 값을 가져올 수 있음
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
