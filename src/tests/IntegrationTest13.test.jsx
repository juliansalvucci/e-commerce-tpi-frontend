import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import { BrowserRouter as Router } from "react-router-dom";
import { CartPage } from "../pages/CartPage";
import React from "react";

// Mockear SweetAlert2 correctamente
vi.mock("sweetalert2", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      default: {
        ...actual.default,
        fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
      },
    };
  });
  
  // Mockear react-router-dom parcialmente
  const mockNavigate = vi.fn();
  vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => mockNavigate, // Devuelve el mock de navigate
    };
  });
  
  describe("CartPage - handlerPurchase", () => {
    const shoppingListMock = [
      { id: 1, name: "Producto 1", quantity: 2, price: 100, imageURL: "" },
      { id: 2, name: "Producto 2", quantity: 1, price: 50, imageURL: "" },
    ];
  
    const cartContextMock = {
      shoppingList: shoppingListMock,
      removeProduct: vi.fn(),
      incrementQuantity: vi.fn(),
      decrementQuantity: vi.fn(),
      createOrder: vi.fn().mockResolvedValue(),
      emptyCart: vi.fn(),
      calculateTotal: () => 250,
      calculateTotalQuantity: () => 3,
    };
  
    beforeEach(() => {
      vi.useFakeTimers(); // Activar temporizadores simulados
    });
  
    afterEach(() => {
      vi.clearAllTimers(); // Limpiar los temporizadores al final de cada prueba
      vi.useRealTimers(); // Restaurar los temporizadores reales
      vi.resetAllMocks(); // Resetear los mocks
    });
  
    it("debe redirigir al usuario a login si no está logueado", async () => {
      // Simula que el usuario no está logueado
      sessionStorage.removeItem("userData");
  
      render(
        <Router>
          <CartContext.Provider value={cartContextMock}>
            <CartPage />
          </CartContext.Provider>
        </Router>
      );
  
      // Click en "Finalizar compra"
      const finishButton = screen.getByRole("button", { name: /finalizar compra/i });
      fireEvent.click(finishButton);
  
      // Verifica que Swal muestra el mensaje de usuario no logueado
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Usuario no logueado",
          text: "¿Desea loguearse para finalizar su compra?",
        })
      );
  
      // Simula la confirmación para redirigir al login
      await vi.runAllTimers(); // Ejecutar temporizadores simulados
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });