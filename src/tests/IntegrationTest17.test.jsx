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

  it("debería validar correctamente cuando todos los campos obligatorios están presentes", async () => {
    const validProduct = {
      nombre: "Iphone 15",
      color: "Celeste",
      tamaño: "Grande",
      marca: "Apple",
      categoria: "Smartphones",
      subcategoria: "Smartphones",
      precio: 2062999,
      stock: 20,
      stockMin: 8,
      imagen: "https://example.com/image.jpg",
      descripcion: "Descripción válida",
    };

    await expect(productSchema.validate(validProduct)).resolves.toEqual(validProduct);
  });
});
