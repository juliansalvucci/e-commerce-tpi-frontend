import { describe, it, expect, vi } from 'vitest';

describe('incrementQuantity Function', () => {
  it('debería permitir incrementar la cantidad si hay stock disponible', () => {
    // Mock del carrito con productos
    const shoppingList = [
      { id: 1, name: 'Producto 1', stock: 5, quantity: 2 },
    ];

    // Mock de la función incrementQuantity
    const incrementQuantity = (productId) => {
      const product = shoppingList.find((p) => p.id === productId);
      if (product && product.stock > product.quantity) {
        product.quantity += 1;
      } else {
        throw new Error('No hay stock disponible para este producto.');
      }
    };

    // Incrementar cantidad
    incrementQuantity(1);

    // Validar que la cantidad aumentó
    expect(shoppingList[0].quantity).toBe(3);
  });

  it('debería evitar incrementar la cantidad si no hay stock disponible', () => {
    // Mock del carrito con productos
    const shoppingList = [
      { id: 1, name: 'Producto 1', stock: 2, quantity: 2 },
    ];

    // Mock de la función incrementQuantity
    const incrementQuantity = (productId) => {
      const product = shoppingList.find((p) => p.id === productId);
      if (product && product.stock > product.quantity) {
        product.quantity += 1;
      } else {
        throw new Error('No hay stock disponible para este producto.');
      }
    };

    // Intentar incrementar cantidad
    expect(() => incrementQuantity(1)).toThrow(
      'No hay stock disponible para este producto.'
    );

    // Validar que la cantidad no cambió
    expect(shoppingList[0].quantity).toBe(2);
  });
});
