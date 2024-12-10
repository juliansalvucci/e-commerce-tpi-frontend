import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import ListProductPage from "../pages/ListProductPage";
import React from "react";

describe("ListProductPage", () => {
  const mockProducts = [
    { id: 1, name: "Producto 1", stock: 10, stockMin: 5, deleteDatetime: null },
    { id: 2, name: "Producto 2", stock: 3, stockMin: 5, deleteDatetime: "2024-12-01" },
  ];

  const mockProductContext = {
    products: mockProducts,
    showDeleted: false,
    setShowDeleted: vi.fn(),
    deleteProduct: vi.fn(),
    restoreProduct: vi.fn(),
    formatProductForEdit: vi.fn(),
    selectProductForEdit: vi.fn(),
  };

  const mockBrandContext = {
    brands: [{ id: 1, name: "Brand A" }, { id: 2, name: "Brand B" }],
  };

  const mockCategoryContext = {
    categories: [{ id: 1, name: "Category A" }, { id: 2, name: "Category B" }],
  };

  const mockSubCategoryContext = {
    subCategories: [{ id: 1, name: "SubCategory A" }, { id: 2, name: "SubCategory B" }],
  };

  it("muestra los botones Edit y Delete cuando showDeleted es false", () => {
    render(
      <MemoryRouter>
        <ProductContext.Provider value={mockProductContext}>
          <BrandContext.Provider value={mockBrandContext}>
            <CategoryContext.Provider value={mockCategoryContext}>
              <SubCategoryContext.Provider value={mockSubCategoryContext}>
                <ListProductPage />
              </SubCategoryContext.Provider>
            </CategoryContext.Provider>
          </BrandContext.Provider>
        </ProductContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("button", { name: /editar/i })).toHaveLength(mockProducts.length);
    expect(screen.getAllByLabelText("Delete")).toHaveLength(mockProducts.length);
    expect(screen.queryByLabelText("Restore")).not.toBeInTheDocument();
  });

  it("muestra el botón Restore cuando showDeleted es true", () => {
    render(
      <MemoryRouter>
        <ProductContext.Provider value={{ ...mockProductContext, showDeleted: true }}>
          <BrandContext.Provider value={mockBrandContext}>
            <CategoryContext.Provider value={mockCategoryContext}>
              <SubCategoryContext.Provider value={mockSubCategoryContext}>
                <ListProductPage />
              </SubCategoryContext.Provider>
            </CategoryContext.Provider>
          </BrandContext.Provider>
        </ProductContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByLabelText("Restore")).toHaveLength(mockProducts.length);
    expect(screen.getAllByRole("button", { name: /editar/i })).toHaveLength(mockProducts.length);
    expect(screen.queryByLabelText("Delete")).not.toBeInTheDocument();
  });
});


  




