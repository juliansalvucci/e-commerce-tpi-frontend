import { render, screen, fireEvent } from "@testing-library/react";
import { CartPopup } from "../components/CartPopup";
import { CartContext } from "../context/CartContext";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("CartPopup Component", () => {
  const mockShoppingList = [
    { id: 1, name: "Product 1", price: 10, quantity: 0, imageURL: "image1.jpg" },
    { id: 2, name: "Product 2", price: 20, quantity: 0, imageURL: "image2.jpg" },
  ];

  it("should increment product quantities correctly", () => {
    const incrementQuantityMock = vi.fn();

    // Render del componente con el mock del contexto
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: incrementQuantityMock,
          decrementQuantity: vi.fn(),
          calculateTotal: vi.fn(() => "$50"),
          calculateTotalQuantity: vi.fn(() => "3 items"),
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verificar que los productos se renderizan
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Encontrar el botón de incremento
    const incrementButton = screen.getAllByText("+")[0];

    // Hacer click en el botón y verificar que el mock es llamado
    fireEvent.click(incrementButton);
    expect(incrementQuantityMock).toHaveBeenCalledWith(1); // ID del producto 1
  });

  it("should decrement product quantities correctly", () => {
    const decrementQuantityMock = vi.fn();

    // Render del componente con el mock del contexto
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: vi.fn(),
          decrementQuantity: decrementQuantityMock,
          calculateTotal: vi.fn(() => "$50"),
          calculateTotalQuantity: vi.fn(() => "3 items"),
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verificar que los productos se renderizan
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Encontrar el botón de decremento
    const decrementButton = screen.getAllByText("-")[0];

    // Hacer click en el botón y verificar que el mock es llamado
    fireEvent.click(decrementButton);
    expect(decrementQuantityMock).toHaveBeenCalledWith(1); // ID del producto 1
  });
});

