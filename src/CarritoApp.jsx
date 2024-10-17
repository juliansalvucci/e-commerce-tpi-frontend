import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { ProductProvider } from "./context/ProductProvider";
import { CartProvider } from "./context/CartProvider";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserProvider } from "./context/UserProvider";
import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import Footer from "./components/Footer";
import BrandProvider from "./context/BrandProvider";
import CategoryProvider from "./context/CategoryProvider";
import SubCategoryProvider from "./context/SubCategoryProvider";
import HomeAdminPage from "./pages/HomeAdminPage";
import ABMBrandPage from "./pages/ABMBrandPage";
import ListBrandPage from "./pages/ListBrandPage";
import ABMCategoryPage from "./pages/ABMCategoryPage";
import ListCategoryPage from "./pages/ListCategoryPage";
import ABMProductPage from "./pages/ABMProductPage";
import ListProductPage from "./pages/ListProductPage";
import ABMSubCategoryPage from "./pages/ABMSubCategoryPage";
import ListSubCategoryPage from "./pages/ListSubCategoryPage";
import SideBarAdmin from "./components/SideBarAdmin";

export const CarritoApp = () => {
  const location = useLocation();

  // Definir rutas en las que no se debe mostrar el NavBar ni el Footer
  const hideNavBarAndFooter = ["/login", "/register"].includes(
    location.pathname
  );

  return (
    <ProductProvider>
      <CategoryProvider>
        <BrandProvider>
          <SubCategoryProvider>
            <SideBarAdmin />
            <div>
              <Routes>
                <Route path="/*" element={<Navigate to="/admin" />}></Route>
                <Route path="/admin" element={<HomeAdminPage />}></Route>
                <Route
                  path="/admin/brand/create"
                  element={<ABMBrandPage />}
                ></Route>
                <Route
                  path="/admin/brand/edit"
                  element={<ABMBrandPage />}
                ></Route>
                <Route
                  path="/admin/brand/list"
                  element={<ListBrandPage />}
                ></Route>
                <Route
                  path="/admin/category/create"
                  element={<ABMCategoryPage />}
                ></Route>
                <Route
                  path="/admin/category/edit"
                  element={<ABMCategoryPage />}
                ></Route>
                <Route
                  path="/admin/category/list"
                  element={<ListCategoryPage />}
                ></Route>
                <Route
                  path="/admin/product/create"
                  element={<ABMProductPage />}
                ></Route>
                <Route
                  path="/admin/product/edit"
                  element={<ABMProductPage />}
                ></Route>
                <Route
                  path="/admin/product/list"
                  element={<ListProductPage />}
                ></Route>
                <Route
                  path="/admin/subcategory/create"
                  element={<ABMSubCategoryPage />}
                ></Route>
                <Route
                  path="/admin/subcategory/edit"
                  element={<ABMSubCategoryPage />}
                ></Route>
                <Route
                  path="/admin/subcategory/list"
                  element={<ListSubCategoryPage />}
                ></Route>
              </Routes>
            </div>
          </SubCategoryProvider>
        </BrandProvider>
      </CategoryProvider>
    </ProductProvider>

    // <UserProvider>
    //   <ProductProvider>
    //     <CartProvider>
    //       {/* Renderiza NavBar solo si no está en las rutas de login o register */}
    //       {!hideNavBarAndFooter && <NavBar />}
    //       <div>
    //         <Routes>
    //           {/* Especifico qué elementos (componente) debo mostrar al tener la ruta localhost:5174/*/}
    //           <Route path="/" element={<ProductsPage />}></Route>
    //           {/* Específico qué elementos (componente) debo mostrar al tener la ruta localhost:5174/carrito */}
    //           <Route path="/carrito" element={<CartPage />}></Route>
    //           {/* Agrego el siguiente camino en caso de que el usuario ingrese algo diferente a lo pedido */}
    //           <Route path="/*" element={<Navigate to="/" />}></Route>
    //           <Route path="/login" element={<LoginPage />}></Route>
    //           <Route path="/register" element={<RegisterPage />}></Route>
    //         </Routes>
    //       </div>
    //       {/* Renderiza Footer solo si no está en las rutas de login o register */}
    //       {!hideNavBarAndFooter && <Footer />}
    //     </CartProvider>
    //   </ProductProvider>
    // </UserProvider>
  );
};
