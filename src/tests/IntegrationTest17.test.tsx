/*Prueba N°17: Validación de campos obligatorios en el formulario de modificación de producto*/

import { describe, it, expect } from "vitest";
import { productSchema } from "../schemas";

describe("Validación de campos requeridos en productSchema", () => {
  it("debería devolver errores para campos requeridos vacíos", async () => {
    // Objeto con todos los campos vacíos
    const invalidProduct = {
      nombre: "",
      color: "",
      tamaño: "",
      marca: "",
      categoria: "",
      subcategoria: "",
      precio: null,
      stock: null,
      stockMin: null,
      imagen: "",
      descripcion: "",
    };

    try {
      await productSchema.validate(invalidProduct, { abortEarly: false });
    } catch (error) {
      const validationErrors = error.inner.map((err) => ({
        path: err.path,
        message: err.message,
      }));

      // Validaciones específicas
      expect(validationErrors).toEqual(
        expect.arrayContaining([
          { path: "nombre", message: "Obligatorio" },
          { path: "color", message: "Obligatorio" },
          { path: "marca", message: "Obligatorio" },
          { path: "categoria", message: "Obligatorio" },
          { path: "subcategoria", message: "Obligatorio" },
          { path: "precio", message: "Obligatorio" },
          { path: "stock", message: "Obligatorio" },
          { path: "stockMin", message: "Obligatorio" },
          { path: "descripcion", message: "Obligatorio" },
        ])
      );
    }
  });
});

it("debería validar correctamente un objeto con datos válidos", async () => {
  // Objeto con todos los campos válidos
  const validProduct = {
    nombre: "Iphone 15”",
    color: "Celeste",
    tamaño: "Grande",
    marca: "Apple",
    categoria: "Smartphones",
    subcategoria: "Smartphones",
    precio: 2062999,
    stock: 20,
    stockMin: 8,
    imagen: "http://example.com/imagen.jpg",
    descripcion:
      "El iPhone 15 viene con la Dynamic Island, cámara gran angular de 48 MP, entrada USB-C y un resistente vidrio con infusión de color en un diseño de aluminio.",
  };

  // La validación no debe lanzar errores
  const result = await productSchema.validate(validProduct);
  expect(result).toEqual(validProduct);
});
