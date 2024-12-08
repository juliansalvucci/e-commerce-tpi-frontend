import { describe, it, expect } from "vitest";
import { productSchema } from "../schemas";

describe("Validaciones de campos obligatorios en productSchema", () => {
  it("debería mostrar un mensaje de error si falta algún campo obligatorio", async () => {
    const invalidProduct = {
      // Todos los campos obligatorios están ausentes
    };

    await expect(productSchema.validate(invalidProduct)).rejects.toThrow(
      "Obligatorio"
    );
  });

  it("debería mostrar un mensaje de error para cada campo obligatorio ausente", async () => {
    const testCases = [
      {
        field: "nombre",
        data: { color: "Rojo", marca: "Marca X", categoria: "Categoria A", subcategoria: "Subcategoria B", precio: 10.5, stock: 10, stockMin: 5 },
        error: "Obligatorio",
      },
      {
        field: "color",
        data: { nombre: "Producto", marca: "Marca X", categoria: "Categoria A", subcategoria: "Subcategoria B", precio: 10.5, stock: 10, stockMin: 5 },
        error: "Obligatorio",
      },
      {
        field: "marca",
        data: { nombre: "Producto", color: "Rojo", categoria: "Categoria A", subcategoria: "Subcategoria B", precio: 10.5, stock: 10, stockMin: 5 },
        error: "Obligatorio",
      },
      // Agrega más casos para cada campo obligatorio
    ];

    for (const { field, data, error } of testCases) {
      await expect(productSchema.validate(data)).rejects.toThrow(error);
    }
  });

  it("debería validar correctamente cuando todos los campos obligatorios están presentes", async () => {
    const validProduct = {
      nombre: "Producto 1",
      color: "Rojo",
      tamaño: "Grande",
      marca: "Marca X",
      categoria: "Categoria A",
      subcategoria: "Subcategoria B",
      precio: 10.5,
      stock: 10,
      stockMin: 5,
      imagen: "https://example.com/image.jpg",
      descripcion: "Descripción válida",
    };

    await expect(productSchema.validate(validProduct)).resolves.toEqual(validProduct);
  });
});
