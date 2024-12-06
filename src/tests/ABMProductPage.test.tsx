/*
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ABMProductPage } from "../pages/ABMProductPage"; // Ajusta la ruta según sea necesario
import { ProductContext } from "../context/ProductContext"; // Si es necesario
import { describe, expect, it, vi } from "vitest";
import React from "react";
import { SubCategoryContext } from "../context/SubCategoryContext";
import { CategoryContext } from "../context/CategoryContext";
import { BrandContext } from "../context/BrandContext";

describe("ABMProductPage", () => {
  it("debe mostrar errores en los campos requeridos al enviar el formulario vacío", async () => {
    render(
        <ProductContext.Provider value={{ createProduct: vi.fn(), editProduct: vi.fn(), selectedProduct: null }}>
          <BrandContext.Provider value={{ brands: [] }}>
            <CategoryContext.Provider value={{ categories: [] }}>
              <SubCategoryContext.Provider value={{ subCategories: [] }}>
                <ABMProductPage />
              </SubCategoryContext.Provider>
            </CategoryContext.Provider>
          </BrandContext.Provider>
        </ProductContext.Provider>
      );
    // Encuentra los campos del formulario
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const colorInput = screen.getByLabelText(/Color/i);
    const precioInput = screen.getByLabelText(/Precio/i);
    const marcaInput = screen.getByLabelText(/Marca/i);
    const categoriaInput = screen.getByLabelText(/Categoría/i);
    const subcategoriaInput = screen.getByLabelText(/Subcategoría/i);
    const stockInput = screen.getByLabelText(/Stock/i);
    const stockMinInput = screen.getByLabelText(/Stock mínimo/i);
    const descripcionInput = screen.getByLabelText(/Descripción/i);

    // Asegúrate de que los campos estén vacíos
    expect(nombreInput).toBeNull();
    expect(colorInput).toBeNull();
    expect(precioInput).toBeNull();
    expect(marcaInput).toBeNull();
    expect(categoriaInput).toBeNull();
    expect(subcategoriaInput).toBeNull();
    expect(stockInput).toBeNull();
    expect(stockMinInput).toBeNull();
    expect(descripcionInput).toBeNull();

    // Simula el clic en el botón de enviar
    const submitButton = screen.getByText(/Enviar/i); // Asegúrate de que este texto sea el correcto
    await userEvent.click(submitButton);

    // Espera a que los errores de validación se muestren
    await waitFor(() => {
      expect(screen.getByText(/Obligatorio/i)).not.toBeNull();
      expect(screen.getByText(/El precio no puede ser menor a \$1/i)).not.toBeNull();
      expect(screen.getByText(/El stock disponible debe ser mayor o igual a 0/i)).not.toBeNull();
      expect(screen.getByText(/El stock minimo debe ser mayor o igual a 0/i)).not.toBeNull();
    });
  });

  it("debe actualizar el campo Nombre al escribir", async () => {
    render(
      <ProductContext.Provider value={{ /* valores del contexto */ }}>
        <ABMProductPage />
      </ProductContext.Provider>
    );

    // Encuentra el campo de "Nombre" y escribe un valor
    const nombreInput = screen.getByLabelText(/Nombre/i);

    // Escribir en el campo
    await userEvent.type(nombreInput, "Producto Test");

    // Verifica que el valor se haya actualizado
    expect(nombreInput).toBeNull();
  });
});
*/