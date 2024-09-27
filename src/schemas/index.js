import * as yup from "yup";
import axios from "axios";

const alMenosUnaLetra = /[a-zA-Z]/;
const primerCharacterLetraONumero = /^[a-zA-Z0-9]/;
const primerCharacterLetra = /^[a-zA-Z]/;
const noNumeros = /^[^0-9]+$/;

// Esquema para la marca
export const brandSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .test(
      `unique-brand`,
      `Ya existe una marca con ese nombre`,
      async function (value) {
        if (!value) return true; // Si el campo está vacío, no hacemos la validación async
        return await isUnique("brand", value); // Llamamos a isUnique para la validación
      }
    ),
});

// Esquema para la categoría
export const categorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .test(
      `unique-category`,
      `Ya existe una categoria con ese nombre`,
      async function (value) {
        if (!value) return true; // Si el campo está vacío, no hacemos la validación async
        return await isUnique("category", value); // Llamamos a isUnique para la validación
      }
    ),
  descripcion: yup
    .string()
    .max(100, "La descripcion debe tener como máximo 100 caracteres")
    .required("Obligatorio"),
});

export const subCategorySchema = yup.object().shape({
  nombre: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .required("Obligatorio")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .test(
      `unique-subcategory`,
      `Ya existe una subcategoria con ese nombre`,
      async function (value) {
        if (!value) return true; // Si el campo está vacío, no hacemos la validación async
        return await isUnique("subcategory", value); // Llamamos a isUnique para la validación
      }
    ),
  descripcion: yup
    .string()
    .max(100, "La descripcion debe tener como maximo 100 caracteres")
    .required("Obligatorio"),
  categoria: yup.string().required("Obligatorio"),
});

export const productSchema = yup.object().shape({
  nombre: yup
    .string()
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .required("Obligatorio")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .matches(
      sinCaracteresEspeciales,
      "El nombre no debe contener caracteres especiales"
    )
    .test(
      `unique-product`,
      `Ya existe un producto con ese nombre`,
      async function (value) {
        if (!value) return true; // Si el campo está vacío, no hacemos la validación async
        return await isUnique("product", value); // Llamamos a isUnique para la validación
      }
    ),
  descripcion: yup.string().required("Obligatorio"),
  precio: yup
    .number()
    .positive("El precio debe ser mayor a $0")
    .required("Obligatorio"),
  stock: yup
    .number()
    .min(0, "El stock disponible debe ser mayor o igual a 0")
    .required("Obligatorio"),
  stockMin: yup
    .number()
    .min(0, "El stock minimo debe ser mayor o igual a 0")
    .required("Obligatorio"),
  imagen: yup.string().required("Obligatorio").url("Debe ser una URL válida"),
  marca: yup.string().required("Obligatorio"),
  subcategoria: yup.string().required("Obligatorio"),
});
