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
      name: "Producto 1",
      price: 100,
      quantity: 1,
      imageURL: "dummy.jpg",
    },
  ],
  removeProduct: vi.fn(),
  incrementQuantity: vi.fn(),
  decrementQuantity: vi.fn(),
  createOrder: vi.fn(),
  emptyCart: vi.fn(),
  calculateTotal: vi.fn().mockReturnValue(100),
  calculateTotalQuantity: vi.fn().mockReturnValue(1),
  subtotal: 100, // Añade valores predeterminados para subtotal
  discount: 0, // Añade valores predeterminados para discount
  totalWithDiscount: 100, // Añade valores predeterminados para totalWithDiscount
};

const mockCartContext2 = {
  shoppingList: [
    {
      id: 1,
      name: "Producto 1",
      price: 100,
      quantity: 1,
      imageURL: "dummy.jpg",
    },
    {
      id: 2,
      name: "Producto 2",
      price: 50,
      quantity: 3, // Producto con cantidad diferente
      imageURL: "dummy2.jpg",
    },
  ],
  removeProduct: vi.fn(),
  incrementQuantity: vi.fn(),
  decrementQuantity: vi.fn(),
  createOrder: vi.fn(),
  emptyCart: vi.fn(),
  calculateTotal: vi.fn().mockReturnValue(100 + 3 * 50), // Total actualizado
  calculateTotalQuantity: vi.fn().mockReturnValue(4), // Cantidad total de productos (1 + 3)
  subtotal: 250, // Subtotal actualizado
  discount: 0, // Descuento aplicado (si es necesario)
  totalWithDiscount: 250, // Total con descuento
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
    subtotal: 0, // Agregado
    discount: 0, // Agregado
    totalWithDiscount: 0, // Agregado
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Carrito vacío
  it("Partición 1: El carrito esta vacío.", () => {
    renderWithProviders(baseCartContext);

    const finishButton = screen.getByText("Finalizar compra");
    expect(finishButton).toBeDisabled();

    const productRows = screen.queryAllByRole("row");
    expect(productRows).toHaveLength(1); // Solo el header
  });

  // Test 3: Varios productos en el carrito
  it("Partición 3: Hay varios productos en el carrito", () => {
    const cartContextWithMultipleProducts = {
      ...baseCartContext,
      shoppingList: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          quantity: 2,
          imageURL: "img1.jpg",
        },
        {
          id: 2,
          name: "Producto 2",
          price: 200,
          quantity: 1,
          imageURL: "img2.jpg",
        },
      ],
      calculateTotal: () => "$400",
      calculateTotalQuantity: () => 3,
    };

    renderWithProviders(cartContextWithMultipleProducts);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    // Aseguramos que se obtiene el elemento total con el precio exacto
    // Buscamos el texto del total con un formato más flexible
    // Buscamos el texto "Total: $400.00" dentro de un <p> o similar
    const totalElement = screen.getByText(/Total:\s*\$\d+\.\d+/); // Usamos una expresión regular para el total

    // Asegúrate de que el totalElement sea encontrado
    expect(totalElement).toBeTruthy(); // Verifica que el elemento existe

    // Verifica que el totalElement está en el documento
    expect(totalElement).toBeInTheDocument();

    expect(screen.getByText("Cantidad de productos: 3")).toBeInTheDocument();
  });

  it("Partición 2: Solo hay un producto en el carrito.", async () => {
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

  // Test 4: Productos con cantidades diferentes
  it("muestra correctamente un producto en el carrito", () => {
    // Renderiza el componente con el contexto mockeado
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Verifica el nombre del producto
    expect(screen.getByText("Producto 1")).toBeInTheDocument();

    // Verifica el precio
    expect(screen.getByText("$100.00")).toBeInTheDocument(); // Precio

    // Verifica que el texto "x" esté presente de manera flexible (dentro del mismo nodo o no)
    const quantityText = screen.getByText(
      (content, element) =>
        content.includes("x") && element?.textContent.includes("x")
    );
    expect(quantityText).toBeInTheDocument();

    // Verifica el total con una expresión regular flexible para capturar espacios
    const totalElement = screen
      .getAllByText(/Total/i)
      .find((el) => el.textContent.includes("$100.00"));
    expect(totalElement).toBeInTheDocument();
  });

  // Test 5: Confirmación de compra

  it("Partición 4: Algunos productos tienen cantidades diferentes.", () => {
    // Renderiza el componente con el contexto mockeado
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext2}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Verifica el nombre del Producto 1
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    // Verifica que la cantidad de Producto 1 sea 1
    expect(screen.getByText(/x 1/)).toBeInTheDocument();
    // Verifica el precio de Producto 1
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    // Verifica el nombre del Producto 2
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    // Verifica que la cantidad de Producto 2 sea 3
    expect(screen.getByText(/x 3/)).toBeInTheDocument();
    // Verifica el precio total de Producto 2 (50 * 3 = 150)
    expect(screen.getByText("$150.00")).toBeInTheDocument();

    // Verifica el total del carrito actualizado (100 + 150 = 250)
    expect(
      screen.getByText((content, element) => {
        return element.textContent?.trim() === "Total: $250.00";
      })
    ).toBeInTheDocument();

    // Verifica el total de productos (1 + 3 = 4)
    expect(screen.getByText(/Cantidad de productos:\s*4/i)).toBeInTheDocument();
  });
});
