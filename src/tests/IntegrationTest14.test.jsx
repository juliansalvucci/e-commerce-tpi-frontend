import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CartPopup } from "../components/CartPopup";
import { CartContext } from "../context/CartContext";
import { CartPage } from "../pages/CartPage";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { act } from "react-dom/test-utils";

// Mock para SweetAlert2
vi.mock("sweetalert2", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fire: vi.fn(), // Ensure this is properly mocked
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

  it("should increment product quantities correctly", () => {
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

  it("should decrement product quantities correctly", () => {
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

  it("should disable the 'Finalizar compra' button if shoppingList is empty", () => {
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

  it("muestra un mensaje de alerta cuando el producto alcanza el límite de stock", async () => {
    const product = {
      id: 1,
      name: "Producto 1",
      price: 100,
      quantity: 1,
      stock: 1, // El límite de stock es 1
      imageURL: "https://example.com/product.jpg",
    };
  
    const addProductToCart = vi.fn();
  
    // Renderizamos el componente CartPage dentro del proveedor de contexto
    render(
      <CartContext.Provider
        value={{
          shoppingList: mockShoppingList,
          removeProduct: vi.fn(),
          incrementQuantity: vi.fn(),
          decrementQuantity: vi.fn(),
          calculateTotal: vi.fn(() => "$50"),
          calculateTotalQuantity: vi.fn(() => "3 items"),
        }}
      >
        <CartPopup isVisible={true} onClose={vi.fn()} />
      </CartContext.Provider>
    );
  
    // Agregar producto al carrito, lo que debería incrementar la cantidad
    act(() => {
      addProductToCart(product);
    });
  
    const plusButtons = screen.getAllByText("+");
    fireEvent.click(plusButtons[0]); // Simulamos que el usuario hace clic en "+"
    
    // Esperamos que se llame a Swal.fire con el mensaje correcto
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "No hay más stock disponible",
      }),
      { timeout: 3000 } // Increase the timeout duration if necessary
    );
  });
  
});


