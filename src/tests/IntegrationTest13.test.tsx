/*
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'; // Importar Vitest para mocks y spies
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartPage } from '../pages/CartPage';
import React from 'react';

// Mock de sweetalert2 correctamente con exportación predeterminada
vi.mock('sweetalert2', async () => {
  const originalModule = await vi.importActual('sweetalert2'); // Importar el módulo real
  return {
    ...originalModule,
    fire: vi.fn(), // Mockear solo la función `fire`
  };
});

const mockCreateOrder = vi.fn();
const mockEmptyCart = vi.fn();
const mockIncrementQuantity = vi.fn();
const mockDecrementQuantity = vi.fn();
const mockRemoveProduct = vi.fn();
const mockCalculateTotal = vi.fn().mockReturnValue(100);
const mockCalculateTotalQuantity = vi.fn().mockReturnValue(2);

const mockShoppingList = [
  { id: 1, name: 'Producto 1', price: 50, quantity: 1, imageURL: '/path/to/image' },
  { id: 2, name: 'Producto 2', price: 50, quantity: 1, imageURL: '/path/to/image' }
];

describe('CartPage', () => {
  it('debe mostrar el pop-up de éxito con los productos comprados y el total', async () => {
    // Mock del contexto de carrito
    const contextValue = {
      shoppingList: mockShoppingList,
      removeProduct: mockRemoveProduct,
      incrementQuantity: mockIncrementQuantity,
      decrementQuantity: mockDecrementQuantity,
      createOrder: mockCreateOrder,
      emptyCart: mockEmptyCart,
      calculateTotal: mockCalculateTotal,
      calculateTotalQuantity: mockCalculateTotalQuantity,
    };

    // Renderizamos el componente con el contexto simulado
    render(
      <Router>
        <CartContext.Provider value={contextValue}>
          <CartPage />
        </CartContext.Provider>
      </Router>
    );

    // Asegúrate de que el botón "Finalizar compra" esté presente
    const finalizarCompraButton = screen.getByRole('button', { name: /Finalizar compra/i });
    expect(finalizarCompraButton).toBeInTheDocument();

    // Simulamos el clic en el botón
    fireEvent.click(finalizarCompraButton);

    // Verificamos que el primer pop-up de SweetAlert2 se haya mostrado
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Finalizar compra',
          text: '¿Desea confirmar la compra?',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        })
      );
    });

    // Simulamos la confirmación utilizando mockResolvedValue
    Swal.fire.mockResolvedValue({ isConfirmed: true });

    // Generamos la lista de productos comprados en formato HTML
    const productsPurchased = mockShoppingList
      .map((product) => `<li>${product.name} x ${product.quantity}</li>`)
      .join(""); // Generar los productos en una lista HTML

    // Verificamos que el segundo pop-up de SweetAlert2 se haya mostrado correctamente
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: 'success',
          title: 'La compra se ha realizado con éxito',
          html: expect.stringContaining(productsPurchased), // Verificar que la lista de productos esté en el HTML
          html: expect.stringContaining('Total: 100'), // Verificar que el total esté en el HTML
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        })
      );
    });

    // Simulamos la confirmación en el segundo pop-up
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

    // Esperamos que el carrito se haya vaciado
    await waitFor(() => {
      expect(mockEmptyCart).toHaveBeenCalled();
    });
  });
});
*/


