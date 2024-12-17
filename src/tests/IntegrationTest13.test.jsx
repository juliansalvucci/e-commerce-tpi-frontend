import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { CartPage } from "../pages/CartPage";
import { CartContext } from "../context/CartContext";
import { BrowserRouter } from "react-router-dom";
import Swal from "sweetalert2";
import React from "react";
import { MemoryRouter } from "react-router-dom";

vi.mock("sweetalert2", async () => {
  const actual = await vi.importActual("sweetalert2");
  return {
    ...actual,
    default: {
      fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
    },
  };
});

const mockCartContext = {
  shoppingList: [
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
      quantity: 1,
      imageURL: 'dummy.jpg',
    },
  ],
  removeProduct: vi.fn(),
  incrementQuantity: vi.fn(),
  decrementQuantity: vi.fn(),
  createOrder: vi.fn(),
  emptyCart: vi.fn(),
  calculateTotal: vi.fn().mockReturnValue(100),
  calculateTotalQuantity: vi.fn().mockReturnValue(1),
};

const renderWithProviders = (cartContextValue) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={cartContextValue}>
        <CartPage />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe("CartPage Component", () => {
  const mockEmptyCart = vi.fn();
  const mockRemoveProduct = vi.fn();
  const mockIncrement = vi.fn();
  const mockDecrement = vi.fn();
  const mockCreateOrder = vi.fn();

  const baseCartContext = {
    shoppingList: [],
    removeProduct: mockRemoveProduct,
    incrementQuantity: mockIncrement,
    decrementQuantity: mockDecrement,
    createOrder: mockCreateOrder,
    emptyCart: mockEmptyCart,
    calculateTotal: () => "$0",
    calculateTotalQuantity: () => 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Carrito vacío
  it("desactiva el botón 'Finalizar compra' cuando el carrito está vacío", () => {
    renderWithProviders(baseCartContext);

    const finishButton = screen.getByText("Finalizar compra");
    expect(finishButton).toBeDisabled();

    const productRows = screen.queryAllByRole("row");
    expect(productRows).toHaveLength(1); // Solo el header
  });

  // Test 2: Un producto en el carrito
  it("muestra correctamente un producto en el carrito", () => {
    const cartContextWithOneProduct = {
      ...baseCartContext,
      shoppingList: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          quantity: 1,
          imageURL: "dummy.jpg",
        },
      ],
      calculateTotal: () => "$100",
      calculateTotalQuantity: () => 1,
    };

    renderWithProviders(cartContextWithOneProduct);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument(); // Precio
    expect(screen.getByText("x")).toBeInTheDocument();      // El separador
    expect(screen.getByText("1")).toBeInTheDocument();      // Cantidad
    


    // Verificar los botones de cantidad
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    expect(mockIncrement).toHaveBeenCalledWith(1);
    expect(mockDecrement).toHaveBeenCalledWith(1);
  });

  // Test 3: Varios productos en el carrito
  it("muestra correctamente múltiples productos en el carrito", () => {
    const cartContextWithMultipleProducts = {
      ...baseCartContext,
      shoppingList: [
        { id: 1, name: "Producto 1", price: 100, quantity: 2, imageURL: "img1.jpg" },
        { id: 2, name: "Producto 2", price: 200, quantity: 1, imageURL: "img2.jpg" },
      ],
      calculateTotal: () => "$400",
      calculateTotalQuantity: () => 3,
    };

    renderWithProviders(cartContextWithMultipleProducts);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    expect(screen.getByText("Total: $400")).toBeInTheDocument();
    expect(screen.getByText("Cantidad de productos: 3")).toBeInTheDocument();
  });

  // Test 4: Productos con cantidades diferentes
  test("muestra correctamente un producto en el carrito", () => {
    // Renderiza el componente con el contexto simulado
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    // Verifica que el nombre del producto esté presente
    expect(screen.getByText("Producto 1")).toBeInTheDocument();

    // Verifica el precio y cantidad, con la solución personalizada para el texto "x"
    expect(screen.getByText("$100.00")).toBeInTheDocument(); // Precio

    // Buscar "x" con una función personalizada
    expect(
      screen.getByText((content, element) => element?.textContent.trim() === "x")
    ).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument(); // Cantidad

    // Verifica el total
    expect(screen.getByText(/Total:\s*\$100/i)).toBeInTheDocument();
  });

  // Test 5: Confirmación de compra
  it("muestra alertas al confirmar la compra", async () => {
    const cartContextWithOneProduct = {
      ...baseCartContext,
      shoppingList: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          quantity: 1,
          imageURL: "dummy.jpg",
        },
      ],
    };

    renderWithProviders(cartContextWithOneProduct);

    const finishButton = screen.getByText("Finalizar compra");
    fireEvent.click(finishButton);

    expect(Swal.fire).toHaveBeenCalledTimes(1);
  });
});
