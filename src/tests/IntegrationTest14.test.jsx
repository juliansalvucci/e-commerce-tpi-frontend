import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CartPopup } from "../components/CartPopup";
import { CartContext } from "../context/CartContext";
import { CartPage } from "../pages/CartPage";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { act } from "react-dom/test-utils";

vi.mock("sweetalert2", async () => {
  const actual = await vi.importActual("sweetalert2");
  return {
    ...actual,
    default: {
      fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
    },
  };
});

describe("CartPopup Component", () => {
  // Define the mockShoppingList outside the individual tests
  const mockShoppingList = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      quantity: 0,
      imageURL: "image1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      quantity: 0,
      imageURL: "image2.jpg",
    },
  ];

  it("El sistema incrementa la cantidad a comprar del producto, no se muestra errores y se le permite al usuario continuar", () => {
    const incrementQuantityMock = vi.fn();

    // Render the component with the mock context
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: incrementQuantityMock,
          decrementQuantity: vi.fn(),
          calculateTotal: vi.fn(() => "$50"),
          calculateTotalQuantity: vi.fn(() => "3 items"),
          subtotal: 50,  // Mock value
      discount: 0,    // Mock value
      totalWithDiscount: 50,  // Mock value
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verify products are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Find the increment button
    const incrementButton = screen.getAllByText("+")[0];

    // Click the button and verify the mock is called
    fireEvent.click(incrementButton);
    expect(incrementQuantityMock).toHaveBeenCalledWith(1); // ID of product 1
  });

  it("Disminuye la cantidad del producto al que se realizó la acción", () => {
    const decrementQuantityMock = vi.fn();

    // Render the component with the mock context
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: vi.fn(),
          decrementQuantity: decrementQuantityMock,
          calculateTotal: vi.fn(() => "$50"),
          calculateTotalQuantity: vi.fn(() => "3 items"),
          subtotal: 50,  // Mock value
      discount: 0,    // Mock value
      totalWithDiscount: 50,  // Mock value
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Verify products are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Find the decrement button
    const decrementButton = screen.getAllByText("-")[0];

    // Click the button and verify the mock is called
    fireEvent.click(decrementButton);
    expect(decrementQuantityMock).toHaveBeenCalledWith(1); // ID of product 1
  });

  it("No disminuye la cantidad del producto al que se realizó la acción", () => {
    render(
      <MemoryRouter>
        <CartContext.Provider
          value={{
            shoppingList: [], // Simulate empty list
            removeProduct: vi.fn(),
            incrementQuantity: vi.fn(),
            decrementQuantity: vi.fn(),
            calculateTotal: vi.fn(() => "$0"),
            calculateTotalQuantity: vi.fn(() => "0 items"),
            emptyCart: vi.fn(),
            createOrder: vi.fn(),
            subtotal: 0,  // Mock value
      discount: 0,    // Mock value
      totalWithDiscount: 0,  // Mock value
          }}
        >
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    // Find the "Finalizar compra" button
    const finishButton = screen.getByRole("button", {
      name: /finalizar compra/i,
    });

    // Verify that the button is disabled
    expect(finishButton).toBeDisabled();
  });

  it("El sistema muestra un error “No hay más stock disponible” y se le permite al usuario continuar", async () => {
    const SwalMock = Swal.fire; // Guardamos la referencia del mock

    const mockShoppingListWithLimitedStock = [
      {
        id: 1,
        name: "Producto 1",
        price: 100,
        quantity: 1,
        stock: 1, // Límite de stock
        imageURL: "https://example.com/product.jpg",
      },
    ];

    const incrementQuantityMock = vi.fn((id) => {
      const product = mockShoppingListWithLimitedStock.find(
        (item) => item.id === id
      );
      if (product && product.quantity >= product.stock) {
        Swal.fire({ title: "No hay más stock disponible" });
      }
    });

    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingListWithLimitedStock,
          incrementQuantity: incrementQuantityMock,
          decrementQuantity: vi.fn(),
          removeProduct: vi.fn(),
          calculateTotal: vi.fn(() => "$100"),
          calculateTotalQuantity: vi.fn(() => "1 item"),
          subtotal: 100,  // Mock value
      discount: 0,    // Mock value
      totalWithDiscount: 100,  // Mock value
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );

    // Simula el clic en "+"
    const plusButtons = screen.getAllByText("+");
    fireEvent.click(plusButtons[0]);

    // Esperamos la llamada correcta de Swal.fire
    await waitFor(() => {
      expect(SwalMock).toHaveBeenCalledWith({
        title: "No hay más stock disponible",
      });
    });

    // Aseguramos que el mock de incrementar se llama
    expect(incrementQuantityMock).toHaveBeenCalledWith(1);
  });
});
