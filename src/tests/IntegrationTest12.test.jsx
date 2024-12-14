import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ListProductPage from "../pages/ListProductPage";
import { ProductContext } from "../context/ProductContext";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock Data
const mockProductContextValue = {
  products: [
    {
      id: 1,
      name: "Producto 1",
      color: "Rojo",
      brand: "Marca A",
      category: "Categoría 1",
      subCategory: "Subcategoría 1",
      price: 1000,
      stock: 50,
      stockMin: 10,
      description: "Descripción del Producto 1",
      size: "M",
      creationDatetime: "2024-01-01",
      updateDatetime: "2024-01-02",
      deleted: false, // Producto activo
      imageURL: "http://example.com/image1.jpg",
    },
    {
      id: 2,
      name: "Producto 2",
      color: "Azul",
      brand: "Marca B",
      category: "Categoría 2",
      subCategory: "Subcategoría 2",
      price: 2000,
      stock: 0,
      stockMin: 5,
      description: "Descripción del Producto 2",
      size: "L",
      creationDatetime: "2024-02-01",
      updateDatetime: "2024-02-02",
      deleted: true, // Producto eliminado
      imageURL: "http://example.com/image2.jpg",
    },
  ],
  showDeleted: true,
  setShowDeleted: vi.fn(),
  deleteProduct: vi.fn(),
  restoreProduct: vi.fn(),
  formatProductForEdit: vi.fn(),
  selectProductForEdit: vi.fn(),
};

const mockBrandContextValue = {
  brands: ["Marca A", "Marca B"],
};

const mockCategoryContextValue = {
  categories: ["Categoría 1", "Categoría 2"],
};

const mockSubCategoryContextValue = {
  subCategories: ["Subcategoría 1", "Subcategoría 2"],
};

// Wrapper para Contextos
const ContextWrapper = ({ children }) => (
  <MemoryRouter>
    <ProductContext.Provider value={mockProductContextValue}>
      <BrandContext.Provider value={mockBrandContextValue}>
        <CategoryContext.Provider value={mockCategoryContextValue}>
          <SubCategoryContext.Provider value={mockSubCategoryContextValue}>
            {children}
          </SubCategoryContext.Provider>
        </CategoryContext.Provider>
      </BrandContext.Provider>
    </ProductContext.Provider>
  </MemoryRouter>
);

// Prueba
test("muestra el botón Restore cuando showDeleted es true", async () => {
  // Cambiar el estado de showDeleted a true para que se muestren los productos eliminados
  mockProductContextValue.showDeleted = true;

  render(
    <ContextWrapper>
      <ListProductPage />
    </ContextWrapper>
  );

  await waitFor(
    () => {
      expect(screen.queryByTestId("circular-progress")).not.toBeInTheDocument();
    },
    { timeout: 10000 }
  );

  // Verificar si el botón Restore aparece
  const restoreButton = await screen.findByTestId("restore-button", {
    timeout: 10000,
  });
  expect(restoreButton).toBeInTheDocument();
  
});



