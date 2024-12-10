import { render, screen, fireEvent } from "@testing-library/react";
import { CartPopup } from "../components/CartPopup";
import { CartContext } from "../context/CartContext";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("CartPopup Component", () => {
  it("should increment and decrement product quantities correctly", () => {
    // Mock del contexto
    const incrementQuantityMock = vi.fn();
    const decrementQuantityMock = vi.fn();

    const mockShoppingList = [
      { id: 1, name: "Product 1", price: 10, quantity: 0, imageURL: "image1.jpg" },
      { id: 2, name: "Product 2", price: 20, quantity: 0, imageURL: "image2.jpg" },
    ];

    // Render del componente con el mock del contexto
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: incrementQuantityMock,
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
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    // Encontrar los botones de incremento y decremento
    const incrementButton = screen.getAllByText("+")[0];
    const decrementButton = screen.getAllByText("-")[0];

    // Hacer click en los botones y verificar que los mocks son llamados
    fireEvent.click(incrementButton);
    expect(incrementQuantityMock).toHaveBeenCalledWith(1); // ID del producto 1

    fireEvent.click(decrementButton);
    expect(decrementQuantityMock).toHaveBeenCalledWith(1); // ID del producto 1
  });
});
