import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductContext } from "../context/ProductContext";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import ABMProductPage from "../pages/ABMProductPage";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("ABMProductPage", () => {
  const mockCreateProduct = vi.fn();
  const mockEditProduct = vi.fn();
  const mockFindCategoryById = vi.fn().mockReturnValue("TestCategory");

  // Simulamos que ya existe un producto seleccionado para la edición
  const productContextValue = {
    createProduct: mockCreateProduct,
    editProduct: mockEditProduct,
    selectedProduct: {
      id: 1,
      nombre: "Producto Existente",
      descripcion: "Descripción",
      precio: 100,
      stock: 10,
      stockMin: 2,
    }, // Producto mockeado para la edición
  };

  const brandContextValue = {
    brands: [
      { id: "1", name: "Brand A" },
      { id: "2", name: "Brand B" },
    ],
  };

  const categoryContextValue = {
    categories: [{ id: "1", name: "Category A" }],
    findCategoryById: mockFindCategoryById,
  };

  const subCategoryContextValue = {
    subCategories: [
      { id: "1", name: "SubCategory A", category: "TestCategory" },
    ],
  };

  it("debería mostrar errores de validación para campos requeridos al modificar un producto", async () => {
    render(
      <BrowserRouter>
        <ProductContext.Provider value={productContextValue}>
          <BrandContext.Provider value={brandContextValue}>
            <CategoryContext.Provider value={categoryContextValue}>
              <SubCategoryContext.Provider value={subCategoryContextValue}>
                <ABMProductPage />
              </SubCategoryContext.Provider>
            </CategoryContext.Provider>
          </BrandContext.Provider>
        </ProductContext.Provider>
      </BrowserRouter>
    );

    // Simulamos el envío del formulario sin cambiar nada en los campos
    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));

    // Esperamos que los errores estén presentes en los campos correspondientes
    await waitFor(() => {
      // Verificar que los campos de formulario muestran los errores de validación según el esquema de yup
      expect(screen.getByText("Obligatorio")).toBeInTheDocument(); // Este es el error común para los campos requeridos
      expect(screen.getByText("El precio no puede ser menor a $1")).toBeInTheDocument();
      expect(screen.getByText("El stock disponible debe ser mayor o igual a 0")).toBeInTheDocument();
      expect(screen.getByText("El stock minimo debe ser mayor o igual a 0")).toBeInTheDocument();
    });
  });
});


