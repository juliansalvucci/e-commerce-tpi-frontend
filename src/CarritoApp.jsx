import { Navigate, Route, Routes } from "react-router-dom";
import { NavBarComponent } from "./components/NavBarComponent";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { ProductProvider } from "./context/ProductProvider";
import { CartProvider } from "./context/CartProvider";
import { UserProvider } from "./context/UserProvider";
//import LoginPage from "./pages/LoginPage";
//import RegisterPage from "./pages/RegisterPage";

export const CarritoApp = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <NavBarComponent />
          <div className="container">
            <Routes>
              {/*Especifico qué elementos (componente) debo mostrar al tener la ruta localhost:5174/*/}
              <Route path="/" element={<ProductsPage />}></Route>
              {/*Especiifo qué elementos (componente) debo mostrar al tener la ruta localhost:5174/carrito*/}
              <Route path="/carrito" element={<CartPage />}></Route>
              {/*Agreggo el siguiente camino en caso de que el usuario ingrese algo diferente a lo pedido*/}
              <Route path="/*" element={<Navigate to="/" />}></Route>
              {/* ROMPE TODO. NO TOCAR
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              */}
            </Routes>
          </div>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};
