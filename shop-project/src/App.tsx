import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Product from "./page/Product";
import Detail from "./page/Detail";
import Box from './page/Box';
import Admin from "./page/Admin";
import Login from "./page/Login";
import { CartProvider } from './CartCotext'; // CartContext에서 CartProvider 임포트
import './App.css';


function App() {
  const router = createBrowserRouter([
    { 
      path: '/', 
      element: <Home/> // Home 페이지
    },
    {
      path: '/product', // 상품 페이지
      element: <Product/>
    },
    {
      path: '/detail/:id', // 상세 페이지 (동적 경로)
      element: <Detail/>
    },
    {
      path: '/box', // 장바구니 페이지
      element: <Box/>
    },
    {
      path:'/admin',
      element: <Admin/>
    },
    {
      path:'/login',
      element: <Login/>
    }
  ]);

  return (
    <CartProvider> {/* CartProvider로 전체 애플리케이션 감싸기 */}
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}

export default App;
