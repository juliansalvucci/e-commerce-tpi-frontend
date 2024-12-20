import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartPopup } from "../components/CartPopup"; // Ajusta la ruta según tu estructura
import { CartContext } from "../context/CartContext";
import React from "react";

describe("CartPopup Component", () => {
  it("debería mostrar el mensaje cuando el carrito está vacío", () => {
    // Mock del contexto
    const mockCartContext = {
      shoppingList: [],
      removeProduct: vi.fn(),
      incrementQuantity: vi.fn(),
      decrementQuantity: vi.fn(),
      calculateTotal: vi.fn(),
      calculateTotalQuantity: vi.fn(),
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verificar que el mensaje se muestra
    expect(
      screen.getByText("Aún no ha agregado productos al carrito!!")
    ).toBeInTheDocument();
  });

  it("debería mostrar los productos en el carrito cuando hay productos", () => {
    // Mock del contexto para un carrito con productos
    const mockCartContext = {
      shoppingList: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          quantity: 2,
          imageURL: "url1",
        },
        { id: 2, name: "Producto 2", price: 50, quantity: 1, imageURL: "url2" },
      ],
      removeProduct: vi.fn(),
      incrementQuantity: vi.fn(),
      decrementQuantity: vi.fn(),
      calculateTotal: () => "$300.00",
      calculateTotalQuantity: () => "3 productos",
      subtotal: 300, // Subtotal actualizado
      discount: 0, // Descuento aplicado (si es necesario)
      totalWithDiscount: 300, // Total con descuento
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verificar que el mensaje no se muestra
    expect(
      screen.queryByText("Aún no ha agregado productos al carrito!!")
    ).not.toBeInTheDocument();

    // Verificar que los productos están presentes
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();

    // Verificar el total y cantidad
    const totalText = screen.getByText(/Total/); // Busca el texto "Total" sin necesidad de especificar un tag
const totalContainer = totalText.closest("p"); // Encuentra el contenedor <p> más cercano

expect(totalContainer).toHaveTextContent("Total: $300.00");

  });
});
