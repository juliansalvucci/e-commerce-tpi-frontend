import * as yup from "yup";
//import axios from "axios";

const alMenosUnaLetra = /[a-zA-Z]/;
//const primeraLetraMayusculaNoNumero = /^[A-Z][^\d]*$/;
const sinCaracteresEspeciales = /^[a-zA-Z0-9\s]+$/;
const soloNumeros = /^\$?\d+(?:\.\d+)*$/;

/*// Función que consulta la API para verificar si un nombre ya existe
const isUnique = async (tipoClase, nombre) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/${tipoClase}?name=${nombre}`
    );
    return response.data.exists === false; // Supongamos que la API devuelve un campo "exists"
  } catch (error) {
    console.error("Error al consultar la API:", error);
    return false; // En caso de error, asumimos que la validación falla
  }
};*/

export const brandSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
    /*.test(
      'unique-brand',
      'Ya existe una marca con ese nombre',
      async ("brand", value) => {
        //Llamada asíncrona a la API para verificar si el nombre de la marca ya existe
        return await isUnique("brand", value);
      }
    ),*/
});

export const subCategorySchema = yup.object().shape({
  nombre: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como maximo 20 caracteres")
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
  /*.test(
      'unique-subcategory',
      'Ya existe una subcategoria con ese nombre',
      async ("subcategory",value) => {
        //Llamada asíncrona a la API para verificar si el nombre de la subcategoria ya existe
        return await isUnique("subcategory", value);
      }
    ),*/
  descripcion: yup
    .string()
    .max(100, "La descripcion debe tener como maximo 100 caracteres")
    .required("Obligatorio"),
  categoria: yup.string().required("Obligatorio"),
});

export const categorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
    /*.test(
      'unique-category',
      'Ya existe una categoria con ese nombre',
      async ("category", value) => {
        //Llamada asíncrona a la API para verificar si el nombre de la categoria ya existe
        return await isUnique("category", value);
      }
    ),*/
  descripcion: yup.string().required("Obligatorio"),
});

export const productSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    //.matches(primeraLetraMayusculaNoNumero, "El primer caracter debe ser una letra mayúscula")
    .matches(
      sinCaracteresEspeciales,
      "El nombre no debe contener caracteres especiales"
    ),
  descripcion: yup.string().required("Obligatorio"),
  precio: yup
    .string()
    .required("Obligatorio")
    .matches(soloNumeros, "El precio debe contener solo números")
    .test("precio-mayor-a-0", "El precio debe ser mayor a $0", (value) => {
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
      return numericValue >= 1;
    }),
  marca: yup.string().required("Obligatorio"),
  subcategoria: yup.string().required("Obligatorio"),
});
