import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import SideBarAdmin from "./components/SideBarAdmin";
import BrandProvider from "./context/BrandProvider";
import { CartProvider } from "./context/CartProvider";
import CategoryProvider from "./context/CategoryProvider";
import OrderHistoryProvider from "./context/OrderHistoryProvider";
import { ProductProvider } from "./context/ProductProvider";
import SubCategoryProvider from "./context/SubCategoryProvider";
import ABMAdminPage from "./pages/ABMAdminPage";
import ABMBrandPage from "./pages/ABMBrandPage";
import ABMCategoryPage from "./pages/ABMCategoryPage";
import ABMProductPage from "./pages/ABMProductPage";
import ABMSubCategoryPage from "./pages/ABMSubCategoryPage";
import AccountPage from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import HomeAdminPage from "./pages/HomeAdminPage";
import ListAdminPage from "./pages/ListAdminPage";
import ListBrandPage from "./pages/ListBrandPage";
import ListCategoryPage from "./pages/ListCategoryPage";
import ListHistoryOrder from "./pages/ListHistoryOrder";
import ListOrderPage from "./pages/ListOrderPage";
import ListProductPage from "./pages/ListProductPage";
import ListSubCategoryPage from "./pages/ListSubCategoryPage";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { RegisterPage } from "./pages/RegisterPage";
import ReportClientsPage from "./pages/ReportClientsPage";
import ReportSalesPage from "./pages/ReportSalesPage";
import StockEntryPage from "./pages/StockEntryPage";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeAdminPage />} />
    <Route path="/account" element={<AccountPage />} />
    <Route path="/account/edit" element={<ABMAdminPage />} />
    <Route path="/user/create" element={<ABMAdminPage />} />
    <Route path="/user/edit" element={<ABMAdminPage />} />
    <Route path="/user/list" element={<ListAdminPage />} />
    <Route path="/brand/create" element={<ABMBrandPage />} />
    <Route path="/brand/edit" element={<ABMBrandPage />} />
    <Route path="/brand/list" element={<ListBrandPage />} />
    <Route path="/category/create" element={<ABMCategoryPage />} />
    <Route path="/category/edit" element={<ABMCategoryPage />} />
    <Route path="/category/list" element={<ListCategoryPage />} />
    <Route path="/product/create" element={<ABMProductPage />} />
    <Route path="/product/edit" element={<ABMProductPage />} />
    <Route path="/product/list" element={<ListProductPage />} />
    <Route path="/product/stock" element={<StockEntryPage />} />
    <Route path="/subcategory/create" element={<ABMSubCategoryPage />} />
    <Route path="/subcategory/edit" element={<ABMSubCategoryPage />} />
    <Route path="/subcategory/list" element={<ListSubCategoryPage />} />
    <Route path="/order/list" element={<ListOrderPage />} />
    <Route path="/report/sales" element={<ReportSalesPage />} />
    <Route path="/report/clients" element={<ReportClientsPage />} />
  </Routes>
);

export const CarritoApp = () => {
  const location = useLocation();
  const hideNavBarAndFooter = ["/login", "/register"].includes(
    location.pathname
  );
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <ProductProvider>
      <CartProvider>
        <OrderHistoryProvider>
          <div className={isAdminRoute ? "app-layout" : ""}>
            {!isAdminRoute ? (
              !hideNavBarAndFooter && <NavBar />
            ) : (
              <SideBarAdmin className="sidebar" />
            )}
            <div className={isAdminRoute ? "content" : ""}>
              {isAdminRoute && <NavBarAdmin className="topbar" />}
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/cartpage" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/orders" element={<ListHistoryOrder />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas de administración, envueltas en los proveedores */}
                <Route
                  path="/admin/*"
                  element={
                    <CategoryProvider>
                      <BrandProvider>
                        <SubCategoryProvider>
                          <AdminRoutes />
                        </SubCategoryProvider>
                      </BrandProvider>
                    </CategoryProvider>
                  }
                />

                {/* Redirección para rutas no encontradas */}
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
          {!isAdminRoute ? !hideNavBarAndFooter && <Footer /> : ""}
        </OrderHistoryProvider>
      </CartProvider>
    </ProductProvider>
  );
};
